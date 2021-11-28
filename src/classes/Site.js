import { ContentBlock } from './ContentBlock.js'
import { Sidebar } from './Sidebar.js'
import { SetingMenu } from './SettingMenu.js'
import { HeaderMenu } from './HeaderMenu.js'
import guid from '../utils/guid.js'

export default class Site {
  constructor(appSelector) {
    this.app = document.querySelector(appSelector)
    this.activeComponent = { id: null, component: null }
    this.newComponent = { parentId: null, id: null, component: null }
    this.content = []
    this.registredElements = {}

    this.addComponent = this.addComponent.bind(this)
    this.createNewComponent = this.createNewComponent.bind(this)
    this.chooseNewactivElement = this.chooseNewactivElement.bind(this)
    this.runData = this.runData.bind(this)
    this.chooseRootLevel = this.chooseRootLevel.bind(this)
    this.deleteComponent = this.deleteComponent.bind(this)

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
    this.HeaderMenu = new HeaderMenu(
      this.content,
      this.runData,
      this.chooseRootLevel,
      this.deleteComponent
    )
  }

  runData(content) {
    this.content = content
    this.fillRegistredElements(this.content)
    this.HeaderMenu.setNewContent(this.content)
    this.renderAll()
  }

  renderAll() {
    this.clearContainer()
    this.content.forEach(({ parentId, id }) => {
      this.renderComponent(parentId, id)
    })
  }

  renderComponent(parentId, id) {
    const container = parentId === 'root' ? this.app : this.registredElements[parentId].getHtml()
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
    const parentId = this.activeComponent.id ? this.activeComponent.id : 'root'

    this.newComponent.parentId = parentId
    this.newComponent.id = id
    this.newComponent.component = new ContentBlock({ id, parentId, componentType })
    this.SetingMenu.showSettingsNewElement()
  }

  addComponent() {
    const parentId = this.newComponent.parentId
    const id = this.newComponent.id
    const componentType = this.newComponent.component.getType()
    const options = this.newComponent.component.getOptions()

    this.registredElements[id] = this.newComponent.component
    this.content.push({ parentId, id, componentType, options })

    this.renderComponent(parentId, id)
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

  chooseRootLevel(event) {
    this.app.querySelector('.active')?.classList?.remove('active')
    this.activeComponent.id = null
    this.activeComponent.component = null
    this.Sidebar.showActivCompInfo()
  }

  deleteComponent() {
    const delComponentId = this.activeComponent.id
    const childrenComponents = this.getAllChildren(delComponentId, this.content)

    if (childrenComponents?.length) {
      childrenComponents.forEach((child) => {
        const contIdx = this.content.findIndex((el) => el.id === child.id)
        delete this.registredElements[child.id]
        this.content.splice(contIdx, 1)
      })
    }

    const delCompContentIdx = this.content.findIndex((el) => el.id === delComponentId)
    this.registredElements[delComponentId].getHtml().remove()
    delete this.registredElements[delComponentId]
    this.content.splice(delCompContentIdx, 1)

    this.activeComponent.id = null
    this.activeComponent.component = null
    this.Sidebar.showActivCompInfo()
  }

  getAllChildren(id, content) {
    const children = content
      .filter(({ parentId }) => parentId == id)
      .map(({ id, parentId }) => ({ id, parentId }))

    if (children.length) {
      let deepChildrenArray = []
      children.forEach(({ id }) => {
        let deperChildrenLevel = this.getAllChildren(id, content)
        if (deperChildrenLevel?.length) {
          deepChildrenArray = [...deepChildrenArray, ...deperChildrenLevel]
        }
      })
      return [...deepChildrenArray, ...children]
    }
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
