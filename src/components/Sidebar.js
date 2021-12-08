import { COMPONENTS_MODEL } from '../models/sidebar-components.js'

export class Sidebar {
  #sidebarContainer
  #infoBanerContainer
  #activeComponent
  #createNewComponent

  constructor({ sidebarSelector, infoBanerSelector, activeComponent, createNewComponent }) {
    this.#sidebarContainer = document.querySelector(sidebarSelector)
    this.#infoBanerContainer = document.querySelector(infoBanerSelector)

    this.chooseNewComponent = this.chooseNewComponent.bind(this)
    this.showActivCompInfo = this.showActivCompInfo.bind(this)

    //Сохроняем ссылку на активный компонент в объекте Site
    //Именно о нем выводиться инфо в containerInfoCurrComp и в него будут добовляться новый компоненты
    this.#activeComponent = activeComponent
    //Функция из Site для создания новых компонентов
    //Данная ф-ция вызываеться из chooseNewComponent при выборе компонента в sidebar
    this.#createNewComponent = createNewComponent

    this.#renderSidebar()
  }

  //Отрисовывает sidebar
  #renderSidebar() {
    const allComponents = Object.values(COMPONENTS_MODEL)

    allComponents.forEach((component) => {
      const li = document.createElement('li')
      li.className = 'component-list-item'
      li.dataset.componentType = component.type
      li.textContent = component.title
      li.addEventListener('click', this.chooseNewComponent)
      this.#sidebarContainer.append(li)
    })
    this.showActivCompInfo()
  }

  chooseNewComponent(event) {
    const el = event.target
    const componentType = el.dataset.componentType
    this.#createNewComponent(componentType)
  }

  //Выводит ивормацию в банере sidebar об активном компоненте (id, type...)
  showActivCompInfo() {
    const info = this.#getActiveCompInfo()

    if (this.#infoBanerContainer?.children?.length) {
      const oldInfo = this.#infoBanerContainer.querySelectorAll('*')
      oldInfo.forEach((el) => el.remove())
    }
    info.forEach((info) => this.#infoBanerContainer.append(info))
  }

  #getActiveCompInfo() {
    const info = []
    const component = this.#activeComponent.component

    if (component) {
      const titleInfo = document.createElement('p')
      titleInfo.textContent = 'Активный компонент:'
      info.push(titleInfo)

      const idInfo = document.createElement('p')
      idInfo.textContent = `id: ${component.getId()}`
      info.push(idInfo)

      const typeInfo = document.createElement('p')
      typeInfo.textContent = `Тип компонента: ${component.getType()}`
      info.push(typeInfo)
    } else {
      const titleInfo = document.createElement('p')
      titleInfo.textContent = 'Вы находитесь в корневом компоненте'
      info.push(titleInfo)
    }

    return info
  }
}
