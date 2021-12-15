import { SettingBlock } from './classes/SettingBlock.js'

export class ColumnSizeCounts extends SettingBlock {
  #labelColSizeCnt
  #selectColSizeCnt

  #columns = [
    'stretch',
    'auto',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12'
  ]

  constructor(values = null) {
    super('colSizeCnt')
    this.#labelColSizeCnt = document.createElement('label')
    this.#selectColSizeCnt = document.createElement('select')
    this.#reneder()
    if (values) this.setValue(values)
  }

  #reneder() {
    this.#labelColSizeCnt.htmlFor = 'option-col-size'
    this.#labelColSizeCnt.className = 'form-label'
    this.#labelColSizeCnt.textContent = 'Размер колонки/к-во колонок'

    this.#selectColSizeCnt.classList.add('form-select', 'form-select-sm')
    this.#selectColSizeCnt.id = 'option-col-size'
    this.#selectColSizeCnt.rows = 3
    this.#fillSelect()

    this.#labelColSizeCnt.append(this.#selectColSizeCnt)

    this.containerAppend(this.#labelColSizeCnt)
  }

  #fillSelect() {
    this.#columns.forEach((opt) => {
      const option = document.createElement('option')
      if (opt === 'stretch') {
        option.selected = true
        option.value = ''
      } else {
        option.value = `col-${opt}`
      }
      option.textContent = opt
      this.#selectColSizeCnt.append(option)
    })
  }

  setValue(values) {
    const colSizeCnt = values[0]
    const options = this.#selectColSizeCnt.querySelectorAll('option')
    options.forEach((option) => {
      if (option.selected === true) option.selected = false
      if (option.value === colSizeCnt) option.selected = true
    })
  }

  getValue() {
    const colSizeCnt = this.#selectColSizeCnt.value
    if (!colSizeCnt) return null
    return [colSizeCnt]
  }
}
