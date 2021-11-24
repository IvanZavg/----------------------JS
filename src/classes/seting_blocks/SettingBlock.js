export class SettingBlock {
  #container
  #optionType
  constructor(optionType) {
    this.#optionType = optionType

    this.#container = document.createElement('div')
    this.#container.classList.add('p-2', 'm-2', 'card')
  }

  getHtml() {
    return this.#container
  }

  getType() {
    return this.#optionType
  }

  containerAppend(el) {
    this.#container.append(el)
  }
}
