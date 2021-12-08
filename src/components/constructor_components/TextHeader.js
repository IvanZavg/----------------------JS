import ConstructorBlock from './classes/ConstructorBlock.js'

export default class TextHeader extends ConstructorBlock {
  constructor(options) {
    super(options.tag, options)
    this.setTextContent(options.text)
  }
}
