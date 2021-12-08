import FabricConstructorComponents from './FabricConstructorComponents.js'

export class ConstructorComponent {
  #componentType
  #options
  #block

  constructor({ id, parentId, componentType, options }) {
    this.#componentType = componentType
    this.#options = options || null
    this.#block = FabricConstructorComponents.create(componentType, { id, parentId, ...options })
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
    return this.#block.getConstructorBlock()
  }

  getId() {
    return this.#block.getId()
  }

  getParentId() {
    return this.#block.getParentId()
  }
}
