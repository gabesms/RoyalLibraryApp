if (process.env.NODE_ENV === 'production') {
  module.exports = require('./storePrd')
} else {
  module.exports = require('./storeDev')
}
