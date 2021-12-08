import { SettingBlock } from './classes/SettingBlock.js'

export class TextColor extends SettingBlock {
  #labelTextColor
  #selectTextColor
  #darkColors = [
    'none',
    'primary',
    'secondary',
    'success',
    'danger',
    'dark',
    'body',
    'muted',
    'black-50',
  ]
  #lightColors = ['warning', 'info', 'light', 'white', 'white-50']

  constructor() {
    super('textColor')
    this.#labelTextColor = document.createElement('label')
    this.#selectTextColor = document.createElement('select')

    this.#reneder()
  }

  #reneder() {
    this.#labelTextColor.htmlFor = 'option-text-color'
    this.#labelTextColor.className = 'form-label'
    this.#labelTextColor.textContent = 'Цвет текста'

    this.#selectTextColor.classList.add('form-select', 'form-select-sm')
    this.#selectTextColor.id = 'option-text-color'
    this.#selectTextColor.rows = 3
    this.#fillSelect('darkTextColors')
    this.#fillSelect('lightTextColors')

    this.#labelTextColor.append(this.#selectTextColor)
    this.containerAppend(this.#labelTextColor)
  }

  #fillSelect(colorType) {
    const textColors = colorType === 'darkTextColors' ? this.#darkColors : this.#lightColors

    textColors.forEach((color) => {
      const option = document.createElement('option')
      option.textContent = color

      if (color === 'none') {
        option.selected = true
        option.value = ''
      } else {
        option.value = `text-${color}`
      }

      if (colorType === 'lightTextColors') option.classList.add('bg-dark')
      option.classList.add(`text-${color}`)
      this.#selectTextColor.append(option)
    })
  }

  getValue() {
    const textColor = this.#selectTextColor.value
    if (!textColor) return null

    const classes = [textColor]
    return classes
  }
}
