const express = require('express')
const Restaurant = require('../../models/restaurant.js')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const entityList = await Restaurant.find().lean()
    res.render('index', { entityList })
  } catch (error) {
    console.log(error)
  }
})

router.get('/search', async (req, res) => {
  const keyword = req.query.keyword.trim()
  const { sort } = req.query
  const sortOptions = {
    'name_en_asc': { name_en: 'asc' },
    'name_en_desc': { name_en: 'desc' },
    'category_asc': { category: 'asc' },
    'location_asc': { location: 'asc' },
  }
  try {
    const selector = {
      $or: [
        { name: RegExp(keyword, 'i') },
        { category: RegExp(keyword, 'i') }
      ]
    }
    const entityList = await Restaurant.find(selector).sort(sortOptions[sort]).lean()
    const isNoResult = entityList.length === 0
    res.render('index', { entityList, keyword, sort, isNoResult })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router