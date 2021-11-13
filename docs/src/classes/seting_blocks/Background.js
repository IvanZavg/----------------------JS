export class Background {
  #optionType
  #container
  #labelBgColor
  #selectBgColor
  #labelGradient
  #checkboxGradient
  #colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

  constructor() {
    this.#optionType = 'bg'
    this.#container = document.createElement('div')

    this.#labelBgColor = document.createElement('label')
    this.#selectBgColor = document.createElement('select')

    this.#labelGradient = document.createElement('label')
    this.#checkboxGradient = document.createElement('input')
    this.#reneder()
  }

  #reneder() {
    this.#container.className = 'mb-3'

    this.#labelBgColor.htmlFor = 'option-bg-color'
    this.#labelBgColor.className = 'form-label'
    this.#labelBgColor.textContent = 'Цвет Фона'

    this.#selectBgColor.classList.add('form-select', 'form-select-sm')
    this.#selectBgColor.id = 'option-bg-color'
    this.#selectBgColor.rows = 3
    this.#fillSelect()

    this.#labelBgColor.append(this.#selectBgColor)
    this.#container.append(this.#labelBgColor)

    this.#labelGradient.htmlFor = 'option-set-grasient'
    this.#labelGradient.className = 'form-label m-2'
    this.#labelGradient.textContent = 'Градиент'

    this.#checkboxGradient.type = 'checkbox'
    this.#checkboxGradient.className = 'form-check-input m-2'

    this.#labelGradient.append(this.#checkboxGradient)
    this.#container.append(this.#labelGradient)
  }

  #fillSelect() {
    this.#colors.forEach((color) => {
      const option = document.createElement('option')
      option.value = `bg-${color}`
      option.textContent = color
      if (color === 'light') option.selected = true
      this.#selectBgColor.append(option)
    })
  }

  getHtml() {
    return this.#container
  }

  getValue() {
    const classes = [this.#selectBgColor.value]
    if (this.#checkboxGradient.checked) classes.push('bg-gradient')
    return classes
  }

  getType() {
    return this.#optionType
  }
}
