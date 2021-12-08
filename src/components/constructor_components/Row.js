import ConstructorBlock from './classes/ConstructorBlock.js'

export default class Row extends ConstructorBlock {
  constructor(options) {
    super('div', options)
    this.getConstructorBlock().classList.add('row')
  }
}
