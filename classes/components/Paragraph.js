import Element from './Element.js'

export default class Paragraph extends Element {
  constructor(options) {
    super('p', options)
    this.setTextContent(options.text)
  }
}
