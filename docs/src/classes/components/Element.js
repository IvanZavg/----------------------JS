export default class Element {
  #elem

  constructor(tag, options) {
    this.#elem = document.createElement(tag)
    this.#elem.id = options.id
    this.setOptions(options)
  }

  getElement() {
    return this.#elem
  }

  setOptions(options) {
    if (options?.tag) {
      this.#elem = document.createElement(options.tag)
      this.#elem.id = options.id
    }
    if (options?.classes?.length) this.setClasses(options.classes)
    if (options?.content) this.setContent(options.content)
    if (options?.text) this.setTextContent(options.text)
  }

  setClasses(classes) {
    this.getElement().classList.add(...classes)
  }

  setContent(content) {
    this.getElement().append(content)
  }

  setTextContent(text) {
    this.getElement().textContent = text
  }
}
