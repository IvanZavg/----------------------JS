export class TagHeaderTitle {
  #optionType
  #container
  #label
  #select
  #tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

  constructor() {
    this.#optionType = 'text'
    this.#container = document.createElement('div')
    this.#label = document.createElement('label')
    this.#select = document.createElement('select')
    this.#reneder()
  }

  #reneder() {
    this.#container.className = 'mb-3'

    this.#label.htmlFor = 'option-text'
    this.#label.className = 'form-label'
    this.#label.textContent = 'Text'

    this.#select.className = 'form-control'
    this.#select.id = 'option-text'
    this.#select.rows = 3

    this.#label.append(this.#select)
    this.#container.append(this.#label)
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
