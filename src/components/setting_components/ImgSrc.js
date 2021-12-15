import { SettingBlock } from './classes/SettingBlock.js'

export class ImgSrc extends SettingBlock {
  #inputChooseImg
  #imgSrc

  constructor(value) {
    super('imgSrc')
    this.#inputChooseImg = document.createElement('input')
    this.loadImgFile = this.loadImgFile.bind(this)
    this.getImgSrc = this.getImgSrc.bind(this)
    this.#reneder()
    if (value) this.setValue(value)
  }

  #reneder() {
    this.#inputChooseImg.type = 'file'
    this.#inputChooseImg.addEventListener('change', this.loadImgFile)

    this.containerAppend(this.#inputChooseImg)
  }

  loadImgFile(event) {
    const imgFile = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = this.getImgSrc
    reader.readAsDataURL(imgFile)
  }

  getImgSrc(event) {
    const data = event.target.result
    this.#imgSrc = data
  }

  setValue(value) {
    this.#imgSrc = value
  }

  getValue() {
    return this.#imgSrc
  }
}
