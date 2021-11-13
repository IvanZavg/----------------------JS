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
      this.#setOptions()
      this.#addComponent()
      this.#clearSetingContainer()
    }
  }

  #setOptions() {
    /*1) Функция перебирает все елементы опций что были отрендерены*/
    /*2) Получает выбраные занчения*/
    /*3) Добавляет в #options даную опцию и ее значение*/
    /*4) Если опция в модели SETTINGS_MODEL имеет параметр isClass == true
         то в #options создается массив classes куда и добавляеться полученное значение  */
    this.#settings.forEach((setting) => {
      if (this.#checkOptionIsClass(setting)) {
        if (!this.#options.classes?.length) {
          this.#options.classes = []
        }
        this.#options.classes.push(...setting.getValue())
      } else {
        this.#options[setting.getType()] = setting.getValue()
      }
    })
    //Вызываем setOptions компонента для их применения к омпоненту
    this.#newCompoenent.component.setOptions(this.#options)
  }

  #clearSetingContainer() {
    this.#setingContainer.textContent = ''
    this.#setingContainer.innerHTML = ''
  }

  #checkOptionIsClass(setting) {
    const elementType = this.#newCompoenent.component.getType()
    const options = SETTINGS_MODEL[elementType]
    const option = options.find((o) => o.option === setting.getType())
    return option.isClass
  }
}
