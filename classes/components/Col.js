import Element from './Element.js'

export default class Col extends Element {
  constructor(options) {
    super('div', options)
    this.setColumnType(options)
  }

  setColumnType(options) {
    const columnType = options.columnType || 'col'
    this.getElement().classList.add(columnType)
  }
}
