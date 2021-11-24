import Element from './Element.js'

export default class Row extends Element {
  constructor(options) {
    super('div', options)
    this.getElement().classList.add('row')
  }
}
