import { dispatchDownloadData } from '../utils/dispatchDownloadData.js'
export class HeaderMenu {
  #contentFileData
  #uploadContentBtn
  #downloadJSONBtn
  #chooseRootBtn
  #deleteComponentBtn
  #changeComponentBtn

  constructor({
    getContent,
    setContent,
    renderDataFromFile,
    chooseRootLevel,
    deleteComponent,
    changeActiveComponent
  }) {
    this.#contentFileData = document.querySelector('#get-content-file-field')
    this.#uploadContentBtn = document.querySelector('#upload-content-btn')
    this.#downloadJSONBtn = document.querySelector('#download-json-btn')
    this.#chooseRootBtn = document.querySelector('#set-root-component-btn')
    this.#deleteComponentBtn = document.querySelector('#delete-component-btn')
    this.#changeComponentBtn = document.querySelector('#change-component-btn')

    this.getContent = getContent
    this.setContent = setContent
    this.renderDataFromFile = renderDataFromFile
    this.chooseRootLevel = chooseRootLevel
    this.deleteComponent = deleteComponent
    this.changeActiveComponent = changeActiveComponent
    this.downloadJSON = this.downloadJSON.bind(this)
    this.renderUploadContent = this.renderUploadContent.bind(this)

    this.#downloadJSONBtn.addEventListener('click', this.downloadJSON)
    this.#uploadContentBtn.addEventListener('click', this.renderUploadContent)
    this.#chooseRootBtn.addEventListener('click', this.chooseRootLevel)
    this.#deleteComponentBtn.addEventListener('click', this.deleteComponent)
    this.#changeComponentBtn.addEventListener(
      'click',
      this.changeActiveComponent
    )
  }

  downloadJSON() {
    const content = this.getContent()
    dispatchDownloadData(content, 'json', 'mySite')
  }

  renderUploadContent() {
    const file = this.#contentFileData.files[0]
    if (!file)
      return alert(
        'Вы не выбрали файл. Нужно сначал выбрать файл для загрузки!'
      )

    const reader = new FileReader()
    const renderDataFromFile = this.renderDataFromFile

    reader.addEventListener('load', function () {
      const result = JSON.parse(reader.result)
      renderDataFromFile(result)
    })
    reader.readAsText(file)
    this.#contentFileData.value = ''
  }
}
