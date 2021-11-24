import { SettingBlock } from './SettingBlock.js'

export class Background extends SettingBlock {
  #previewBlock
  #labelBgColor
  #selectBgColor
  #labelGradient
  #checkboxGradient
  #colors = [
    'none',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ]

  constructor() {
    super('bg')

    this.#previewBlock = document.createElement('div')

    this.#labelBgColor = document.createElement('label')
    this.#selectBgColor = document.createElement('select')

    this.#labelGradient = document.createElement('label')
    this.#checkboxGradient = document.createElement('input')

    this.changePreviewColor = this.changePreviewColor.bind(this)
    this.#reneder()
  }

  #reneder() {
    this.#previewBlock.style.border = '1px double black'
    this.#previewBlock.style.minHeight = '1.5em'

    this.#labelBgColor.htmlFor = 'option-bg-color'
    this.#labelBgColor.className = 'form-label'
    this.#labelBgColor.textContent = 'Цвет Фона'

    this.#selectBgColor.classList.add('form-select', 'form-select-sm')
    this.#selectBgColor.id = 'option-bg-color'
    this.#selectBgColor.rows = 3
    this.#fillSelect()
    this.#selectBgColor.addEventListener('change', this.changePreviewColor)

    this.#labelBgColor.append(this.#selectBgColor)

    this.#labelGradient.htmlFor = 'option-set-grasient'
    this.#labelGradient.className = 'form-label m-2'
    this.#labelGradient.textContent = 'Градиент'

    this.#checkboxGradient.type = 'checkbox'
    this.#checkboxGradient.className = 'form-check-input m-2'

    this.#labelGradient.append(this.#checkboxGradient)

    this.containerAppend(this.#labelBgColor)
    this.containerAppend(this.#previewBlock)
    this.containerAppend(this.#labelGradient)
  }

  changePreviewColor() {
    const selectedOption = this.#selectBgColor[this.#selectBgColor.selectedIndex]
    this.#previewBlock.className = selectedOption.value
  }

  #fillSelect() {
    this.#colors.forEach((color) => {
      const option = document.createElement('option')
      option.textContent = color

      if (color === 'none') {
        option.selected = true
        option.value = ''
      } else {
        option.value = `bg-${color}`
      }

      this.#selectBgColor.append(option)
    })
  }

  getValue() {
    const bgColor = this.#selectBgColor.value
    if (!bgColor) return null

    const classes = [bgColor]
    if (this.#checkboxGradient.checked) classes.push('bg-gradient')
    return classes
  }
}
