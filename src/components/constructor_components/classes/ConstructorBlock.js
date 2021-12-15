export default class ConstructorBlock {
  #elem
  #id
  #parentId

  constructor(tag, options) {
    this.#elem = document.createElement(tag)
    this.#id = options.id
    this.#parentId = options.parentId

    this.#elem.id = this.#id
    this.setOptions(options)
  }

  getParentId() {
    return this.#parentId
  }

  getId() {
    return this.#id
  }

  getConstructorBlock() {
    return this.#elem
  }

  setOptions(options) {
    if (options?.tag) {
      if (!this.#elem.parentNode) {
        const newNode = document.createElement(options.tag)
        newNode.id = this.#id
        this.#elem = newNode
      }
    }
    if (options?.classes?.length) this.setClasses(options.classes)
    if (options?.content) this.setContent(options.content)
    if (options?.text) this.setTextContent(options.text)
  }

  setClasses(classes) {
    this.#elem.classList.add(...classes)
  }

  setContent(content) {
    this.#elem.append(content)
  }

  setTextContent(text) {
    this.#elem.textContent = text
  }
}
