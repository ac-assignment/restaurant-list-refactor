const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurantList })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  if (!keyword) {
    res.redirect('/')
    return
  }
  const searchResult = restaurantList.filter(r => 
    r.name.toLowerCase().includes(keyword) ||
    r.category.toLowerCase().includes(keyword)
  )
  const isNoResult = searchResult.length === 0

  res.render('index', { restaurantList: searchResult, keyword, isNoResult })
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  const restaurant = restaurantList.find(r => r.id.toString() === restaurantId)

  res.render('show', { restaurant })
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
