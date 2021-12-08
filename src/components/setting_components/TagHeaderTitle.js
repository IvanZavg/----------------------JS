import { SettingBlock } from './classes/SettingBlock.js'

export class TagHeaderTitle extends SettingBlock {
  #label
  #select
  #tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

  constructor() {
    super('tag')
    this.#label = document.createElement('label')
    this.#select = document.createElement('select')
    this.#reneder()
  }

  #reneder() {
    this.#label.htmlFor = 'option-h-tag'
    this.#label.className = 'form-label'
    this.#label.textContent = 'Уровень заголовка'

    this.#select.classList.add('form-select', 'form-select-sm')
    this.#select.id = 'option-h-tag'
    this.#select.rows = 3
    this.#fillSelect()

    this.#label.append(this.#select)
    this.containerAppend(this.#label)
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

  getValue() {
    return this.#select.value
  }
}
