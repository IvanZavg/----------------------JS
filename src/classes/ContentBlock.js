import { componentFabric } from './ComponentFab.js'

export class ContentBlock {
  #id
  #parentId
  #componentType
  #options
  #block

  constructor({ id, parentId, componentType, options }) {
    this.#id = id
    this.#parentId = parentId
    this.#componentType = componentType
    this.#options = options || null
    this.#block = componentFabric.create(componentType, { id: this.#id, ...options })
  }

  setOptions(options) {
    this.#options = options
    this.#block.setOptions(this.#options)
  }

  getOptions() {
    return this.#options
  }

  getType() {
    return this.#componentType
  }

  getHtml() {
    return this.#block.getElement()
  }

  getId() {
    return this.#id
  }

  getParentId() {
    return this.#parentId
  }
}
