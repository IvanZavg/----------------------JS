import { SettingBlock } from './classes/SettingBlock.js'

export class VerticalColAlign extends SettingBlock {
  #label
  #selectVerticalAlign
  #vAlign = ['none', 'to-top', 'to-bottom', 'to-center-v']

  constructor(values = null) {
    super('verticalColAlign')
    this.#label = document.createElement('label')
    this.#selectVerticalAlign = document.createElement('select')
    this.#reneder()
    if (values) this.setValue(values)
  }

  #reneder() {
    this.#label.htmlFor = 'option-vartical-col-align'
    this.#label.className = 'form-label'
    this.#label.textContent = 'Вертикальное выравнивание'

    this.#selectVerticalAlign.classList.add('form-select', 'form-select-sm')
    this.#selectVerticalAlign.id = 'option-vartical-col-align'
    this.#selectVerticalAlign.rows = 3
    this.#fillSelect()

    this.#label.append(this.#selectVerticalAlign)
    this.containerAppend(this.#label)
  }

  #fillSelect() {
    this.#vAlign.forEach((opt) => {
      const option = document.createElement('option')
      if (opt === 'none') {
        option.selected = true
        option.value = ''
      } else {
        option.value = opt
      }
      option.textContent = opt
      this.#selectVerticalAlign.append(option)
    })
  }

  setValue(values) {
    const verticalAlign = values[0]
    const options = this.#selectVerticalAlign.querySelectorAll('option')
    options.forEach((option) => {
      if (option.selected === true) option.selected = false
      if (option.value === verticalAlign) option.selected = true
    })
  }

  getValue() {
    const verticalAlign = this.#selectVerticalAlign.value
    if (!verticalAlign) return null
    return [verticalAlign]
  }
}
