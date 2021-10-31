const express = require('express')
const expressHandlebars = require('express-handlebars')
const restaurantList = require('./restaurant.json')

const app = express()
const port = 3000

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurantList: restaurantList.results })
})

app.get('/search', (req, res) => {
  const { keyword } = req.query
  const searchResult = restaurantList.results.filter(r => {
    return r.name.toLowerCase().includes(keyword.toLowerCase())
  })

  res.render('index', { restaurantList: searchResult, keyword })
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  const restaurant = restaurantList.results.find(r => r.id.toString() === restaurantId)

  res.render('show', { restaurant })
})

app.listen(port, () => {
  console.log('listening')
})
