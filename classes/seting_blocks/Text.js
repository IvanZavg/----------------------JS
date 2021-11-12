export class Text {
  #optionType
  #container
  #label
  #textArea

  constructor() {
    this.#optionType = 'text'
    this.#container = document.createElement('div')
    this.#label = document.createElement('label')
    this.#textArea = document.createElement('textarea')
    this.#reneder()
  }

  #reneder() {
    this.#container.className = 'mb-3'

    this.#label.htmlFor = 'option-text'
    this.#label.className = 'form-label'
    this.#label.textContent = 'Text'

    this.#textArea.className = 'form-control'
    this.#textArea.id = 'option-text'
    this.#textArea.rows = 5

    this.#label.append(this.#textArea)
    this.#container.append(this.#label)
  }

  getHtml() {
    return this.#container
  }

  getValue() {
    return this.#textArea.value
  }

  getType() {
    return this.#optionType
  }
}
