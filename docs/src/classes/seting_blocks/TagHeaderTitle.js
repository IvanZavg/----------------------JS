export class TagHeaderTitle {
  #optionType
  #container
  #label
  #select
  #tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

  constructor() {
    this.#optionType = 'tag'
    this.#container = document.createElement('div')
    this.#label = document.createElement('label')
    this.#select = document.createElement('select')
    this.#reneder()
  }

  #reneder() {
    this.#container.className = 'mb-3'

    this.#label.htmlFor = 'option-h-tag'
    this.#label.className = 'form-label'
    this.#label.textContent = 'Уровень заголовка'

    this.#select.classList.add('form-select', 'form-select-sm')
    this.#select.id = 'option-h-tag'
    this.#select.rows = 3
    this.#fillSelect()

    this.#label.append(this.#select)
    this.#container.append(this.#label)
  }

  #fillSelect() {
    this.#tags.forEach((tag) => {
      const option = document.createElement('option')
      option.value = tag
      option.textContent = tag
      if (tag === 'h1') option.selected = true
      this.#select.append(option)
    })
  }

  getHtml() {
    return this.#container
  }

  getValue() {
    return this.#select.value
  }

  getType() {
    return this.#optionType
  }
}
