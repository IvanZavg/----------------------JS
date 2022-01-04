import { SettingBlock } from './classes/SettingBlock.js'

export class HorizontalColAlign extends SettingBlock {
  #label
  #selectHorizontalAlign
  #hAlign = ['none', 'to-left', 'to-right', 'to-center-h']

  constructor(values = null) {
    super('horizontalColAlign')
    this.#label = document.createElement('label')
    this.#selectHorizontalAlign = document.createElement('select')
    this.#reneder()
    if (values) this.setValue(values)
  }

  #reneder() {
    this.#label.htmlFor = 'option-vartical-col-align'
    this.#label.className = 'form-label'
    this.#label.textContent = 'Горизонтальное выравнивание'

    this.#selectHorizontalAlign.classList.add('form-select', 'form-select-sm')
    this.#selectHorizontalAlign.id = 'option-vartical-col-align'
    this.#selectHorizontalAlign.rows = 3
    this.#fillSelect()

    this.#label.append(this.#selectHorizontalAlign)
    this.containerAppend(this.#label)
  }

  #fillSelect() {
    this.#hAlign.forEach((opt) => {
      const option = document.createElement('option')
      if (opt === 'none') {
        option.selected = true
        option.value = ''
      } else {
        option.value = opt
      }
      option.textContent = opt
      this.#selectHorizontalAlign.append(option)
    })
  }

  setValue(values) {
    const horizontalAlign = values[0]
    const options = this.#selectHorizontalAlign.querySelectorAll('option')
    options.forEach((option) => {
      if (option.selected === true) option.selected = false
      if (option.value === horizontalAlign) option.selected = true
    })
  }

  getValue() {
    const horizontalAlign = this.#selectHorizontalAlign.value
    if (!horizontalAlign) return null
    return [horizontalAlign]
  }
}
