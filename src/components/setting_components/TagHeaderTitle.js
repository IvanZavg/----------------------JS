import { SettingBlock } from './classes/SettingBlock.js'

export class TagHeaderTitle extends SettingBlock {
  #label
  #selectTag
  #tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

  constructor(value = null) {
    super('tag')
    this.#label = document.createElement('label')
    this.#selectTag = document.createElement('select')
    this.#reneder()
    if (value) this.setValue(value)
  }

  #reneder() {
    this.#label.htmlFor = 'option-h-tag'
    this.#label.className = 'form-label'
    this.#label.textContent = 'Уровень заголовка'

    this.#selectTag.classList.add('form-select', 'form-select-sm')
    this.#selectTag.id = 'option-h-tag'
    this.#selectTag.rows = 3
    this.#fillSelect()

    this.#label.append(this.#selectTag)
    this.containerAppend(this.#label)
  }

  #fillSelect() {
    this.#tags.forEach((tag) => {
      const option = document.createElement('option')
      option.value = tag
      option.textContent = tag
      if (tag === 'h1') option.selected = true
      this.#selectTag.append(option)
    })
  }
  setValue(value) {
    const headerTag = value
    const options = this.#selectTag.querySelectorAll('option')
    options.forEach((option) => {
      if (option.selected === true) option.selected = false
      if (option.value === headerTag) option.selected = true
    })
    this.#selectTag.disabled = true
  }

  getValue() {
    return this.#selectTag.value
  }
}
