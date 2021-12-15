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
  #kindOfComponent

  constructor({ getComponentData, addNewComponent, setComponentOptions }) {
    this.#getComponentData = getComponentData
    this.#addNewComponent = addNewComponent
    this.#setComponentOptions = setComponentOptions
    this.#options = {}
    this.#setingMenu = document.querySelector('#settings')
    this.#setingContainer = this.#setingMenu.querySelector(
      '.settings-menu-options'
    )

    this.addNewComponent = this.addNewComponent.bind(this)
    this.changeActiveComponent = this.changeActiveComponent.bind(this)

    this.#btnApply = this.#setingMenu.querySelector('.apply-btn')
    this.#hideButtonAply()
  }

  showSettingsActiveComponent() {
    this.#kindOfComponent = 'active'
    const componentType = this.#getComponentData(
      this.#kindOfComponent,
      'componentType'
    )
    const componentOptions = this.#getComponentData(
      this.#kindOfComponent,
      'options'
    )
    this.#renederComponentSettings(componentType, componentOptions)
    this.#btnApply.addEventListener('click', this.changeActiveComponent)
  }

  showSettingsNewComponent() {
    this.#kindOfComponent = 'new'
    const componentType = this.#getComponentData(
      this.#kindOfComponent,
      'componentType'
    )
    this.#renederComponentSettings(componentType)
    this.#btnApply.addEventListener('click', this.addNewComponent)
  }

  #renederComponentSettings(componentType, options = {}) {
    this.#clearSetingContainer()
    this.#options = options

    const availableOptions = SETTINGS_MODEL[componentType]
    if (!availableOptions) {
      this.#setingContainer.textContent =
        'Для данного компонента нет дополнительных опций'
      return
    }

    availableOptions.forEach((option) => {
      const prevOptionValue = this.#getOptionValue(option.option)
      const settingBlock = new option.settingBlock(prevOptionValue)
      this.#settings.push(settingBlock)
      this.#setingContainer.append(settingBlock.getHtml())
    })
    this.#showButtonAply()
  }

  addNewComponent() {
    if (this.#settings.length) this.#setOptions()
    this.#addNewComponent()
    this.#clearSetingContainer()
    this.#btnApply.removeEventListener('click', this.addNewComponent)
  }

  changeActiveComponent() {
    this.#clearPrevComponentClasses()
    if (this.#settings.length) this.#setOptions()
    this.#clearSetingContainer()
    this.#btnApply.removeEventListener('click', this.changeActiveComponent)
  }
  #clearPrevComponentClasses() {
    const component = this.#getComponentData('active', 'html')
    if (this.#options.classes) {
      this.#options.classes.forEach((clssName) => {
        component.classList.remove(clssName)
      })
      this.#options.classes = []
    }
  }
  #setOptions() {
    this.#settings.forEach((setting) => {
      const settingVal = setting.getValue()

      if (this.#checkOptionIsClass(setting)) {
        if (!settingVal) return
        if (!this.#options.classes) {
          this.#options.classes = []
        }
        this.#options.classes.push(...settingVal)
      }
      this.#options[setting.getType()] = settingVal
    })
    this.#setComponentOptions(this.#kindOfComponent, this.#options)
  }

  #clearSetingContainer() {
    this.#options = {}
    this.#setingContainer.textContent = ''
    this.#setingContainer.innerHTML = ''
    this.#settings = []
    this.#hideButtonAply()
  }

  #getOptionValue(optionType) {
    return this.#options[optionType] ? this.#options[optionType] : null
  }

  #checkOptionIsClass(setting) {
    const componentType = this.#getComponentData(
      this.#kindOfComponent,
      'componentType'
    )
    const options = SETTINGS_MODEL[componentType]
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
