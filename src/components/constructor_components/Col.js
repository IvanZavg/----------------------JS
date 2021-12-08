import ConstructorBlock from './classes/ConstructorBlock.js'

export default class Col extends ConstructorBlock {
  constructor(options) {
    super('div', options)
    this.setColumnType(options)
  }

  setColumnType(options) {
    const columnType = options.columnType || 'col'
    this.getConstructorBlock().classList.add(columnType)
  }
}
