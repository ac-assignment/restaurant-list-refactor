const { create } = require('express-handlebars')

const hbs = create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    isEqual(prevOption, thisOption) {
      return prevOption === thisOption
    }
  }
})

module.exports = hbs