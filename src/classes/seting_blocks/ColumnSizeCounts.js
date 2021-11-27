import { SettingBlock } from './SettingBlock.js'

export class ColumnSizeCounts extends SettingBlock {
  #labelColSizeCnt
  #selectColSizeCnt

  #columns = ['stretch', 'auto', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  constructor() {
    super('colSizeCnt')
    this.#labelColSizeCnt = document.createElement('label')
    this.#selectColSizeCnt = document.createElement('select')
    this.#reneder()
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

  getValue() {
    const colSizeCnt = this.#selectColSizeCnt.value
    if (!colSizeCnt) return null
    return [colSizeCnt]
  }
}
