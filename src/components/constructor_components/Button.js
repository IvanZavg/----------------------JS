import ConstructorBlock from './classes/ConstructorBlock.js'

export default class Button extends ConstructorBlock {
  constructor(options) {
    super('button', options)
    this.setTextContent(options.text)
  }
}
