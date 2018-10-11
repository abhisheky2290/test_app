// var _ = require('lodash');

exports.isArray = function (value) {
  return Array.isArray(value);
}
module.exports = {
  isArray: (value) => {
    return Array.isArray(value);
  },
  enum: (input, options) => options.includes(input)
}