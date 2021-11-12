import { COMPONENTS_MODEL } from '../models/sidebar-components.js'

export class Sidebar {
  #container
  #containerInfoCurrComp
  #activeComponent
  #createNewComponent

  constructor({ listSelector, infoSelector, activeComponent, fCreateNewComponent }) {
    this.#container = document.querySelector(listSelector)
    this.#containerInfoCurrComp = document.querySelector(infoSelector)

    this.chooseComponentToAdd = this.chooseComponentToAdd.bind(this)
    this.showActivCompInfo = this.showActivCompInfo.bind(this)

    //Сохроняем ссылку на активный компонент в объекте Site
    //Именно о нем выводиться инфо в containerInfoCurrComp и в него будут добовляться новый компоненты
    this.#activeComponent = activeComponent
    //Функция из Site для создания новых компонентов
    //Данная ф-ция вызываеться из chooseComponentToAdd при выборе компонента в sidebar
    this.#createNewComponent = fCreateNewComponent

    this.#render()
  }

  //Отрисовывает sidebar
  #render() {
    const allComponents = Object.values(COMPONENTS_MODEL)

    allComponents.forEach((component) => {
      const li = document.createElement('li')
      li.className = 'component-list-item'
      li.dataset.componentType = component.type
      li.textContent = component.title
      li.addEventListener('click', this.chooseComponentToAdd)
      this.#container.append(li)
    })
    this.showActivCompInfo()
  }

  chooseComponentToAdd(event) {
    const el = event.target
    const componentType = el.dataset.componentType
    this.#createNewComponent(componentType)
  }

  //Выводит ивормацию об активном компоненте (в который будут добовляться новые компоненты)
  showActivCompInfo() {
    const info = this.#prepareActiveCompInfo()

    if (this.#containerInfoCurrComp?.children?.length) {
      const oldInfo = this.#containerInfoCurrComp.querySelectorAll('*')
      oldInfo.forEach((el) => el.remove())
    }
    info.forEach((info) => this.#containerInfoCurrComp.append(info))
  }

  #prepareActiveCompInfo() {
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
