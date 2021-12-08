import { COMPONENTS_MODEL } from '../models/sidebar-components.js'

export class Sidebar {
  #sidebarContainer
  #infoBanerContainer
  #createNewComponent
  #getComponentData

  constructor({ sidebarSelector, infoBanerSelector, getComponentData, createNewComponent }) {
    this.#sidebarContainer = document.querySelector(sidebarSelector)
    this.#infoBanerContainer = document.querySelector(infoBanerSelector)

    this.chooseNewComponent = this.chooseNewComponent.bind(this)
    this.showActivCompInfo = this.showActivCompInfo.bind(this)

    this.#getComponentData = getComponentData
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

  showActivCompInfo() {
    //Выводит ивормацию в банере sidebar об активном компоненте (id, type...)
    const info = this.#prepareBanerInformation()
    if (this.#infoBanerContainer?.children?.length) {
      const oldInfo = this.#infoBanerContainer.querySelectorAll('*')
      oldInfo.forEach((el) => el.remove())
    }
    info.forEach((info) => this.#infoBanerContainer.append(info))
  }

  #prepareBanerInformation() {
    //Подготавливает информацию для отображения в банере об активном компоненте
    const info = []

    if (this.#getComponentData('active', 'isInit')) {
      const titleInfo = document.createElement('p')
      titleInfo.textContent = 'Активный компонент:'
      info.push(titleInfo)

      const idInfo = document.createElement('p')
      idInfo.textContent = `id: ${this.#getComponentData('active', 'id')}`
      info.push(idInfo)

      const typeInfo = document.createElement('p')
      typeInfo.textContent = `Тип компонента: ${this.#getComponentData('active', 'componentType')}`
      info.push(typeInfo)
    } else {
      const titleInfo = document.createElement('p')
      titleInfo.textContent = 'Вы находитесь в корневом компоненте'
      info.push(titleInfo)
    }

    return info
  }
}
