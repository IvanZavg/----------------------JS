import { dispatchDownloadData } from '../utils/dispatchDownloadData.js'
export class HeaderMenu {
  constructor(content, runData, chooseRootLevel) {
    this.downloadJSONBtn = document.querySelector('#download-json-btn')
    this.uploadContentBtn = document.querySelector('#upload-content-btn')
    this.deleteComponentBtn = document.querySelector('#delete-component-btn')
    this.contentFileData = document.querySelector('#get-content-file-field')
    this.chooseRootBtn = document.querySelector('#set-root-component-btn')

    this.content = content
    this.runData = runData
    this.chooseRootLevel = chooseRootLevel
    this.downloadJSON = this.downloadJSON.bind(this)
    this.runUploadContent = this.runUploadContent.bind(this)

    this.downloadJSONBtn.addEventListener('click', this.downloadJSON)
    this.uploadContentBtn.addEventListener('click', this.runUploadContent)
    this.chooseRootBtn.addEventListener('click', this.chooseRootLevel)
  }

  downloadJSON() {
    dispatchDownloadData(this.content, 'json', 'mySite')
  }

  setNewContent(content) {
    this.content = content
  }

  runUploadContent() {
    const file = this.contentFileData.files[0]
    const reader = new FileReader()
    const runData = this.runData

    reader.addEventListener('load', function () {
      const result = JSON.parse(reader.result)
      runData(result)
    })

    reader.readAsText(file)
  }
}
