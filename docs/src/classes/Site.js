import { ContentBlock } from './ContentBlock.js'
import { Sidebar } from './Sidebar.js'
import { SetingMenu } from './SettingMenu.js'
import { HeaderMenu } from './HeaderMenu.js'
import guid from '../utils/guid.js'

export default class Site {
  constructor(appSelector) {
    this.app = document.querySelector(appSelector)
    this.activeComponent = { id: null, component: null }
    this.newComponent = { perentId: null, id: null, component: null }
    this.content = []
    this.registredElements = {}

    this.addComponent = this.addComponent.bind(this)
    this.createNewComponent = this.createNewComponent.bind(this)
    this.chooseNewactivElement = this.chooseNewactivElement.bind(this)
    this.runData = this.runData.bind(this)

    this.Sidebar = new Sidebar({
      listSelector: '.element-list',
      infoSelector: '.active-element',
      fAddComponent: this.addComponent,
      fCreateNewComponent: this.createNewComponent,
      activeComponent: this.activeComponent,
    })

    this.SetingMenu = new SetingMenu({
      newComp: this.newComponent,
      activeComp: this.activeComponent,
      addComp: this.addComponent,
    })
    this.HeaderMenu = new HeaderMenu(this.content, this.runData)
  }

  runData(content) {
    this.content = content
    this.fillRegistredElements(this.content)
    this.renderAll()
  }

  renderAll() {
    this.clearContainer()
    this.content.forEach(({ perentId, id }) => {
      this.renderComponent(perentId, id)
    })
  }

  renderComponent(perentId, id) {
    const container = perentId === 'root' ? this.app : this.registredElements[perentId].getHtml()
    const htmlElement = this.registredElements[id].getHtml()
    htmlElement.addEventListener('click', this.chooseNewactivElement)
    container.append(htmlElement)
  }

  fillRegistredElements(data) {
    if (Array.isArray(data)) {
      data.forEach((elData) => {
        this.registredElements[elData.id] = new ContentBlock(elData)
      })
    } else if (typeof data === 'Object') {
      this.registredElements[data.id] = new ContentBlock(data)
    } else {
      throw new Error('Error data type for fillRegistredElements! data mast be Array or Object')
    }
  }

  clearContainer() {
    const childrens = this.app.querySelectorAll('*')
    childrens.forEach((el) => el.remove())
  }

  createNewComponent(componentType) {
    const id = guid()
    const perentId = this.activeComponent.id ? this.activeComponent.id : 'root'

    this.newComponent.perentId = perentId
    this.newComponent.id = id
    this.newComponent.component = new ContentBlock({ id, perentId, componentType })
    this.SetingMenu.showSettingsNewElement()
  }

  addComponent() {
    const perentId = this.newComponent.perentId
    const id = this.newComponent.id
    const componentType = this.newComponent.component.getType()
    const options = this.newComponent.component.getOptions()

    this.registredElements[id] = this.newComponent.component
    this.content.push({ perentId, id, componentType, options })

    this.renderComponent(perentId, id)
  }

  setActiveComponent(id) {
    this.activeComponent.id = id
    this.activeComponent.component = this.registredElements[id]
    this.Sidebar.showActivCompInfo()
  }

  chooseNewactivElement(event) {
    const component = event.target
    const id = component.id
    this.setActiveComponent(id)

    this.app.querySelector('.active')?.classList?.remove('active')
    component.classList.add('active')
  }

  //testing function
  testSetActiveComponent(idx) {
    const id = this.content[idx]['id']
    this.setActiveComponent(id)
  }
  testLogContent() {
    console.log(JSON.stringify(this.content))
  }
}
