import { ConstructorComponent } from './classes/ConstructorComponent.js'
import { Sidebar } from './Sidebar.js'
import { SetingMenu } from './SettingMenu.js'
import { HeaderMenu } from './HeaderMenu.js'
import guid from '../utils/guid.js'

export default class Site {
  #activeComponent
  #newComponent
  constructor(appSelector) {
    this.app = document.querySelector(appSelector)
    this.#activeComponent = null
    this.#newComponent = null
    this.content = []
    this.registredElements = {}

    this.addNewComponent = this.addNewComponent.bind(this)
    this.createNewComponent = this.createNewComponent.bind(this)
    this.chooseNewActivComponent = this.chooseNewActivComponent.bind(this)
    this.renderDataFromFile = this.renderDataFromFile.bind(this)
    this.chooseRootLevel = this.chooseRootLevel.bind(this)
    this.deleteComponent = this.deleteComponent.bind(this)
    this.getComponentData = this.getComponentData.bind(this)
    this.setComponentOptions = this.setComponentOptions.bind(this)

    this.Sidebar = new Sidebar({
      sidebarSelector: '.element-list',
      infoBanerSelector: '.active-element',
      createNewComponent: this.createNewComponent,
      getComponentData: this.getComponentData,
    })
    this.SetingMenu = new SetingMenu({
      getComponentData: this.getComponentData,
      addNewComponent: this.addNewComponent,
      setComponentOptions: this.setComponentOptions,
    })
    this.HeaderMenu = new HeaderMenu({
      content: this.content,
      renderDataFromFile: this.renderDataFromFile,
      chooseRootLevel: this.chooseRootLevel,
      deleteComponent: this.deleteComponent,
    })
  }

  //Render Methods -------------------------------------------
  renderDataFromFile(content) {
    this.content = content
    this.fillRegistredElements(this.content)
    this.HeaderMenu.setNewContent(this.content)
    this.renderAllContent()
  }

  renderAllContent() {
    this.clearContainer()
    this.content.forEach(({ parentId, id }) => {
      this.renderComponent(parentId, id)
    })
  }

  renderComponent(parentId, id) {
    const container = parentId === 'root' ? this.app : this.registredElements[parentId].getHtml()
    const htmlElement = this.registredElements[id].getHtml()
    htmlElement.addEventListener('click', this.chooseNewActivComponent)
    container.append(htmlElement)
  }
  //----------------------------------------------------------------------

  //Content/Structure control Methods-------------------------------------------------
  fillRegistredElements(data) {
    if (Array.isArray(data)) {
      data.forEach((elData) => {
        this.registredElements[elData.id] = new ConstructorComponent(elData)
      })
    } else if (typeof data === 'Object') {
      this.registredElements[data.id] = new ConstructorComponent(data)
    } else {
      throw new Error('Error data type for fillRegistredElements! data mast be Array or Object')
    }
  }

  clearContainer() {
    const childrens = this.app.querySelectorAll('*')
    childrens.forEach((el) => el.remove())
  }

  deleteComponent() {
    const delComponentId = this.#activeComponent.getId()
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

    this.chooseRootLevel()
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
  //-----------------------------------------------------------------------

  //Component Methods ----------------------------------------------------------
  //New Component Methods
  createNewComponent(componentType) {
    const id = guid()
    const parentId = this.#activeComponent === null ? 'root' : this.#activeComponent.getId()
    this.#newComponent = new ConstructorComponent({ id, parentId, componentType })
    this.SetingMenu.showSettingsNewElement()
  }

  addNewComponent() {
    const parentId = this.#newComponent.getParentId()
    const id = this.#newComponent.getId()
    const componentType = this.#newComponent.getType()
    const options = this.#newComponent.getOptions()

    this.registredElements[id] = this.#newComponent
    this.content.push({ parentId, id, componentType, options })

    this.renderComponent(parentId, id)
  }

  //Activw Component Methods
  setActiveComponent(id) {
    this.#activeComponent = this.registredElements[id]
    this.Sidebar.showActivCompInfo()
  }

  chooseNewActivComponent(event) {
    const component = event.target
    const id = component.id
    this.setActiveComponent(id)

    this.app.querySelector('.active')?.classList?.remove('active')
    component.classList.add('active')
  }

  //Common Component Methods
  chooseRootLevel() {
    this.app.querySelector('.active')?.classList?.remove('active')
    this.#activeComponent = null
    this.Sidebar.showActivCompInfo()
  }

  setComponentOptions(componentType, options) {
    let component = null

    if (componentType === 'active') {
      component = this.#activeComponent
    } else if (componentType === 'new') {
      component = this.#newComponent
    }

    component.setOptions(options)
  }

  getComponentData(componentType, dataType) {
    let component = null

    if (componentType === 'active') {
      component = this.#activeComponent
    } else if (componentType === 'new') {
      component = this.#newComponent
    }

    if (dataType === 'isInit') {
      return component === null ? false : true
    } else if (dataType === 'id') {
      return component.getId()
    } else if (dataType === 'parentId') {
      return component.getParentId()
    } else if (dataType === 'componentType') {
      return component.getType()
    } else if (dataType === 'html') {
      return component.getHtml()
    }
  }
  //------------------------------------------------------------------
}
