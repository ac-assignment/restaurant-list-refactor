const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const restaurantList = require('./restaurant.json').results

mongoose.connect('mongodb://localhost:27017/restaurant_list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  
  restaurantList.forEach(r => {
    Restaurant.create({ ...r })
  })
  
  console.log('done')
})