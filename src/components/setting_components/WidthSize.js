import { SettingBlock } from './classes/SettingBlock.js'

export class WidthSize extends SettingBlock {
  #labelWidth
  #selectWidth
  #width = [
    'auto',
    '25',
    '50',
    '100',
    '150',
    '200',
    '250',
    '300',
    '350',
    '400',
    '450',
    '500',
    '550',
    '600',
    '650',
    '700',
    '750'
  ]

  constructor(values = null) {
    super('widthSize')
    this.#labelWidth = document.createElement('label')
    this.#selectWidth = document.createElement('select')
    this.#reneder()
    if (values) this.setValue(values)
  }

  #reneder() {
    this.#labelWidth.htmlFor = 'option-width'
    this.#labelWidth.className = 'form-label'
    this.#labelWidth.textContent = 'Ширина блока'

    this.#selectWidth.classList.add('form-select', 'form-select-sm')
    this.#selectWidth.id = 'option-width'
    this.#selectWidth.rows = 3
    this.#fillSelect()

    this.#labelWidth.append(this.#selectWidth)
    this.containerAppend(this.#labelWidth)
  }

  #fillSelect() {
    this.#width.forEach((opt) => {
      const option = document.createElement('option')
      if (opt === 'auto') {
        option.selected = true
        option.value = ''
      } else {
        option.value = `wsz-${opt}`
      }
      option.textContent = opt
      this.#selectWidth.append(option)
    })
  }

  setValue(values) {
    const widthSize = values[0]
    const options = this.#selectWidth.querySelectorAll('option')
    options.forEach((option) => {
      if (option.selected === true) option.selected = false
      if (option.value === widthSize) option.selected = true
    })
  }

  getValue() {
    const widthSize = this.#selectWidth.value
    if (!widthSize) return null
    return [widthSize]
  }
}
