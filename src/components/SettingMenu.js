import { SETTINGS_MODEL } from '../models/setting-components.js'

export class SetingMenu {
  #settings = []
  #setingMenu
  #setingContainer
  #btnApply
  #options
  #getComponentData
  #setComponentOptions
  #addNewComponent

  constructor({ getComponentData, addNewComponent, setComponentOptions }) {
    this.#getComponentData = getComponentData
    this.#addNewComponent = addNewComponent
    this.#setComponentOptions = setComponentOptions
    this.#options = {}
    this.#setingMenu = document.querySelector('#settings')
    this.#setingContainer = this.#setingMenu.querySelector('.settings-menu-options')

    this.addNewComponent = this.addNewComponent.bind(this)

    this.#btnApply = this.#setingMenu.querySelector('.apply-btn')
    this.#btnApply.addEventListener('click', this.addNewComponent)
    this.#hideButtonAply()
  }

  showSettingsNewElement() {
    /*Отрисовывает доступные опции для выбраного компонента*/
    /*Вызываеться из site в ф-ции createNewComponent когда в sidebar выбираеться новый компонент */
    const elementType = this.#getComponentData('new', 'componentType')
    this.#renederComponentSettings(elementType)
  }

  #renederComponentSettings(elementType) {
    this.#settings = []
    this.#options = {}
    this.#clearSetingContainer()
    this.#showButtonAply()

    const availableOptions = SETTINGS_MODEL[elementType]
    if (!availableOptions) {
      this.#setingContainer.textContent = 'Для данного компонента нет дополнительных опций'
      return
    }

    availableOptions.forEach((option) => {
      const settingBlock = new option.settingBlock()
      this.#settings.push(settingBlock)
      this.#setingContainer.append(settingBlock.getHtml())
    })
  }

  addNewComponent() {
    if (this.#settings.length) this.#setOptions()
    this.#addNewComponent()
    this.#clearSetingContainer()
  }

  #setOptions() {
    this.#settings.forEach((setting) => {
      const settingVal = setting.getValue()

      if (this.#checkOptionIsClass(setting)) {
        if (!settingVal) return
        if (!this.#options.classes?.length) {
          this.#options.classes = []
        }
        this.#options.classes.push(...settingVal)
      } else {
        this.#options[setting.getType()] = settingVal
      }
    })
    this.#setComponentOptions('new', this.#options)
  }

  #clearSetingContainer() {
    this.#setingContainer.textContent = ''
    this.#setingContainer.innerHTML = ''
    this.#settings = []
    this.#hideButtonAply()
  }

  #checkOptionIsClass(setting) {
    const elementType = this.#getComponentData('new', 'componentType')
    const options = SETTINGS_MODEL[elementType]
    const option = options.find((o) => o.option === setting.getType())
    return option.isClass
  }

  #showButtonAply() {
    if (this.#btnApply.classList.contains('hide')) {
      this.#btnApply.classList.remove('hide')
    }
  }

  #hideButtonAply() {
    if (!this.#btnApply.classList.contains('hide')) {
      this.#btnApply.classList.add('hide')
    }
  }
}
