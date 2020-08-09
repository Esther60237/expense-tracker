const Handlebars = require('handlebars')
Handlebars.registerHelper('ifEquals', function (category, filter, options) {
  if (category === filter) {
    return options.fn(this)
  }
  return options.inverse(this)
})
