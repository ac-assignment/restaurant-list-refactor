const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const isImageURL = require('image-url-validator').default
const Restaurant = require('./models/restaurant.js')

const app = express()
const db = mongoose.connection
const port = 3000


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

/* 首頁 */
app.get('/', async (req, res) => {
  try {
    const entityList = await Restaurant.find().lean()
    res.render('index', { entityList })
  } catch (error) {
    console.log(error)
  }
})

/* 搜尋並過濾 */
app.get('/search', async (req, res) => {
  const keyword = req.query.keyword.trim()
  if (!keyword) {
    res.redirect('/')
    return
  }
  try {
    const resultByName = await Restaurant.find({ name: RegExp(keyword, 'i') }).lean()
    const resultByCategory = await Restaurant.find({ category: RegExp(keyword, 'i') }).lean()
    const entityList = [...resultByName, ...resultByCategory].filter((entity, index, result) => {
      const firstIndex = result.findIndex(x => x._id.toString() === entity._id.toString())
      return firstIndex === index
    })
    const isNoResult = entityList.length === 0
    
    res.render('index', { entityList, keyword, isNoResult })
  } catch (error) {
    console.log(error)
  }
})

/* 新增餐廳頁面 */
app.get('/restaurants/create', async (req, res) => {
  res.render('create', { isAgain: false })
})

/* 新增餐廳提交 */
app.post('/restaurants', async (req, res) => {
  const entity = req.body
  try {
    const isImageValid = await isImageURL(entity.image)
    if (isImageValid) {
      await Restaurant.create(entity)
      res.redirect('/')
    } else {
      res.render('create', { entity, isAgain: true })
    }
  } catch (error) {
    console.log(error)
  }
})

/* 編輯餐廳頁面 */
app.get('/restaurants/:id/edit', async (req, res) => {
  const { id } = req.params
  try {
    const entity = await Restaurant.findById(id).lean()
    res.render('edit', { entity, isAgain: false })
  } catch (error) {
    console.log(error)
  }
})

/* 編輯餐廳提交 */
app.post('/restaurants/:id', async (req, res) => {
  const { id } = req.params
  const entity = req.body
  try {
    const isImageValid = await isImageURL(entity.image)
    if (isImageValid) {
      await Restaurant.findByIdAndUpdate(id, entity)
      res.redirect('/')
    } else {
      entity._id = id
      entity.image = null
      res.render('edit', { entity, isAgain: true })
    }
  } catch (error) {
    console.log(error)
  }
})

/* 餐廳詳細資訊 */
app.get('/restaurants/:id', async (req, res) => {
  const { id } = req.params
  try {
    const entity = await Restaurant.findById(id).lean()
    res.render('detail', { entity })
  } catch (error) {
    console.log(error)
  }
})

/* 刪除餐廳 */
app.post('/restaurants/:id/delete', async (req, res) => {
  const { id } = req.params
  try {
    await Restaurant.findByIdAndDelete(id)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})