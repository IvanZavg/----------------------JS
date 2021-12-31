import { SettingBlock } from './classes/SettingBlock.js'

export class ButtonStyle extends SettingBlock {
  #previewButton
  #labelButtonStyle
  #prevSelectedStyle = 'btn-primary'
  #selectButtonStyle
  #buttonStyles = [
    'btn-primary',
    'btn-secondary',
    'btn-success',
    'btn-danger',
    'btn-warning',
    'btn-info',
    'btn-light',
    'btn-dark',
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ]

  constructor(values = null) {
    super('button-style')

    this.#previewButton = document.createElement('button')

    this.#labelButtonStyle = document.createElement('label')
    this.#selectButtonStyle = document.createElement('select')

    this.changePreviewButtonStyle = this.changePreviewButtonStyle.bind(this)
    this.#reneder()
    if (values) this.setValue(values)
  }

  #reneder() {
    this.#previewButton.textContent = 'preview'
    this.#previewButton.classList.add('btn', 'btn-primary')

    this.#labelButtonStyle.htmlFor = 'option-button-style'
    this.#labelButtonStyle.className = 'form-label'
    this.#labelButtonStyle.textContent = 'Стиль кнопки'

    this.#selectButtonStyle.classList.add('form-select', 'form-select-sm')
    this.#selectButtonStyle.id = 'option-button-style'
    this.#selectButtonStyle.rows = 3
    this.#fillSelect()
    this.#selectButtonStyle.addEventListener(
      'change',
      this.changePreviewButtonStyle
    )

    this.#labelButtonStyle.append(this.#selectButtonStyle)

    this.containerAppend(this.#labelButtonStyle)
    this.containerAppend(this.#previewButton)
  }

  changePreviewButtonStyle(prevStyle) {
    if (this.#prevSelectedStyle) {
      this.#previewButton.classList.remove(this.#prevSelectedStyle)
    }

    const selectedOption =
      this.#selectButtonStyle[this.#selectButtonStyle.selectedIndex]
    this.#previewButton.classList.add(selectedOption.value)
    this.#prevSelectedStyle = selectedOption.value
  }

  #fillSelect() {
    this.#buttonStyles.forEach((buttonStyle) => {
      const option = document.createElement('option')
      option.textContent = buttonStyle

      if (buttonStyle === 'btn-primary') {
        option.selected = true
        option.value = 'btn-primary'
      } else {
        option.value = `${buttonStyle}`
      }

      this.#selectButtonStyle.append(option)
    })
  }

  setValue(values) {
    const buttonStyle = values[0]
    const options = this.#selectButtonStyle.querySelectorAll('option')
    options.forEach((option) => {
      if (option.selected === true) option.selected = false
      if (option.value === buttonStyle) option.selected = true
    })
    this.changePreviewButtonStyle()
  }

  getValue() {
    const buttonStyle = this.#selectButtonStyle.value
    if (!buttonStyle) return null

    const classes = [buttonStyle]
    return classes
  }
}
