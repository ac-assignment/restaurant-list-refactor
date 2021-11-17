const express = require('express')
const router = express.Router()

router.use('/', require('./modules/home'))
router.use('/', require('./modules/restaurant'))

module.exports = router