const db = require('../../config/mongoose.js')
const Restaurant = require('../restaurant.js')
const restaurantList = require('./restaurant.json').results

db.once('open', () => {
  restaurantList.forEach(r => {
    Restaurant.create({ ...r })
  })

  console.log('done')
})