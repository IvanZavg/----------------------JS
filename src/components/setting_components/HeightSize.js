import { SettingBlock } from './classes/SettingBlock.js'

export class HeightSize extends SettingBlock {
  #labelHeight
  #selectHeight

  #height = [
    'auto',
    '25',
    '50',
    '100',
    '150',
    '200',
    '250',
    '300',
    '350',
    '400',
    '450',
    '500',
    '550',
    '600',
    '650',
    '700',
    '750'
  ]

  constructor(values = null) {
    super('heightSize')
    this.#labelHeight = document.createElement('label')
    this.#selectHeight = document.createElement('select')
    this.#reneder()
    if (values) this.setValue(values)
  }

  #reneder() {
    this.#labelHeight.htmlFor = 'option-height'
    this.#labelHeight.className = 'form-label'
    this.#labelHeight.textContent = 'Высота блока'

    this.#selectHeight.classList.add('form-select', 'form-select-sm')
    this.#selectHeight.id = 'option-height'
    this.#selectHeight.rows = 3
    this.#fillSelect()

    this.#labelHeight.append(this.#selectHeight)

    this.containerAppend(this.#labelHeight)
  }

  #fillSelect() {
    this.#height.forEach((opt) => {
      const option = document.createElement('option')
      if (opt === 'auto') {
        option.selected = true
        option.value = ''
      } else {
        option.value = `hsz-${opt}`
      }
      option.textContent = opt
      this.#selectHeight.append(option)
    })
  }

  setValue(values) {
    const hightSize = values[0]
    const options = this.#selectHeight.querySelectorAll('option')
    options.forEach((option) => {
      if (option.selected === true) option.selected = false
      if (option.value === hightSize) option.selected = true
    })
  }

  getValue() {
    const heightSize = this.#selectHeight.value
    if (!heightSize) return null
    return [heightSize]
  }
}
