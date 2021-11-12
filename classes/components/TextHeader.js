import Element from './Element.js'

export default class TextHeader extends Element {
  constructor(options) {
    super(options.tag, options)
    this.setTextContent(options.text)
  }
}
