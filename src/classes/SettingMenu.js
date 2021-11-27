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
    this.#newCompoenent = newComp
    this.#activeComponent = activeComp
    this.#addComponent = addComp

    this.#initSettingMenu()
  }

  #initSettingMenu() {
    this.#options = {}
    this.addNewComponent = this.addNewComponent.bind(this)

    this.#setingMenu = document.querySelector('#settings')
    this.#setingContainer = this.#setingMenu.querySelector('.settings-menu-options')

    this.#btnApply = this.#setingMenu.querySelector('.apply-btn')
    this.#btnApply.addEventListener('click', this.addNewComponent)
    this.#hideButtonAply()
  }

  showSettingsNewElement() {
    /*Отрисовывает доступные опции для выбраного компонента*/
    /*Вызываеться из site в ф-ции createNewComponent когда в sidebar выбираеться новый компонент */
    const elementType = this.#newCompoenent.component.getType()
    this.#renederSettings(elementType)
  }

  #renederSettings(elementType) {
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
    this.#addComponent()
    this.#clearSetingContainer()
  }

  #setOptions() {
    /* 1. Функция перебирает все елементы опций что были отрендерены*/
    /* 2. Получает выбраные занчения*/
    /* 3. Добавляет в #options даную опцию и ее значение*/
    /* 3.1 Если опция в модели SETTINGS_MODEL имеет параметр isClass == true
         то в #options создается массив classes куда и добавляеться полученное значение  */
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
    //Вызываем setOptions компонента для их применения к омпоненту
    debugger
    this.#newCompoenent.component.setOptions(this.#options)
  }

  #clearSetingContainer() {
    this.#setingContainer.textContent = ''
    this.#setingContainer.innerHTML = ''
    this.#settings = []
    this.#hideButtonAply()
  }

  #checkOptionIsClass(setting) {
    const elementType = this.#newCompoenent.component.getType()
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
