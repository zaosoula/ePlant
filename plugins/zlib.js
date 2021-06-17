const zlib = require('zlib')

export default ({ app }, inject) => {
  inject('zlib', zlib);
}