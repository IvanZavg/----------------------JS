import Element from './Element.js'

export default class Image extends Element {
  constructor(options) {
    super('img', options)
    this.getElement().src = options.src
  }
}
