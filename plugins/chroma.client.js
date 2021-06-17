const chroma = require("chroma-js");

export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('chroma', chroma)
}