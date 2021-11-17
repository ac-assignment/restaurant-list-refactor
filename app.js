const express = require('express')
const methodOverride = require('method-override')
const router = require('./routes/index.js')
const hbs = require('./config/handlebar.js')
require('./config/mongoose.js')

const app = express()
const port = 3000

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set("views", "./views")
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(router)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})