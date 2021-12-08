import ConstructorBlock from './classes/ConstructorBlock.js'

export default class Paragraph extends ConstructorBlock {
  constructor(options) {
    super('p', options)
    this.setTextContent(options.text)
  }
}
