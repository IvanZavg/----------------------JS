import ConstructorBlock from './classes/ConstructorBlock.js'

export default class Image extends ConstructorBlock {
  constructor(options) {
    super('img', options)
  }
  setOptions(options) {
    super.setOptions(options)
    if (options?.imgSrc) this.getConstructorBlock().src = options.imgSrc
  }
}
