import { SETTINGS_MODEL } from '../models/setting-components.js'

export class SetingMenu {
  #settings = []
  #setingMenu
  #setingContainer
  #btnApply
  #options
  #newCompoenent
  #activeComponent
  #addComponent

  constructor({ newComp, activeComp, addComp }) {
    this.#setingMenu = document.querySelector('#settings')
    this.#setingContainer = this.#setingMenu.querySelector('.settings-menu-options')
    this.#btnApply = this.#setingMenu.querySelector('.apply-btn')
    this.#options = {}
    this.#newCompoenent = newComp
    this.#activeComponent = activeComp

    this.#addComponent = addComp
    this.addNewComponent = this.addNewComponent.bind(this)

    this.#btnApply.addEventListener('click', this.addNewComponent)
  }

  //Вызываем из site в ф-ции createNewComponent когда в sidebar выбираеться новый компонент
  showSettingsNewElement() {
    const elementType = this.#newCompoenent.component.getType()
    this.#renederSettings(elementType)
  }

  #renederSettings(elementType) {
    this.#settings = []
    this.#options = {}
    this.#clearSetingContainer()

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
    if (!this.#settings.length) {
      this.#addComponent()
      this.#clearSetingContainer()
      return
    } else {
      this.#settings.forEach((setting) => {
        this.#options[setting.getType()] = setting.getValue()
      })
      this.#newCompoenent.component.setOptions(this.#options)
      this.#addComponent()
      this.#clearSetingContainer()
    }
  }

  #clearSetingContainer() {
    this.#setingContainer.textContent = ''
    this.#setingContainer.innerHTML = ''
  }
}
