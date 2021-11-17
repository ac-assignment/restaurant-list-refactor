const express = require('express')
const isImageURL = require('image-url-validator').default
const Restaurant = require('../../models/restaurant.js')
const router = express.Router()

/* 新增餐廳頁面 */
router.get('/restaurants/create', async (req, res) => {
  res.render('create', { isAgain: false })
})

/* 新增餐廳提交 */
router.post('/restaurants', async (req, res) => {
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
router.get('/restaurants/:id/edit', async (req, res) => {
  const { id } = req.params
  try {
    const entity = await Restaurant.findById(id).lean()
    res.render('edit', { entity, isAgain: false })
  } catch (error) {
    console.log(error)
  }
})

/* 編輯餐廳提交 */
router.put('/restaurants/:id', async (req, res) => {
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
router.get('/restaurants/:id', async (req, res) => {
  const { id } = req.params
  try {
    const entity = await Restaurant.findById(id).lean()
    res.render('detail', { entity })
  } catch (error) {
    console.log(error)
  }
})

/* 刪除餐廳 */
router.delete('/restaurants/:id', async (req, res) => {
  const { id } = req.params
  try {
    await Restaurant.findByIdAndDelete(id)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router