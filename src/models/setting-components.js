import { TagHeaderTitle } from '../classes/seting_blocks/TagHeaderTitle.js'
import { Text } from '../classes/seting_blocks/Text.js'
import { Background } from '../classes/seting_blocks/Background.js'
import { TextColor } from '../classes/seting_blocks/TextColor.js'
import { ImgSrc } from '../classes/seting_blocks/ImgSrc.js'
import { WidthSize } from '../classes/seting_blocks/WidthSize.js'
import { HeightSize } from '../classes/seting_blocks/HeightSize.js'
import { ColumnSizeCounts } from '../classes/seting_blocks/ColumnSizeCounts.js'

export const SETTINGS_MODEL = {
  row: [
    { option: 'bg', settingBlock: Background, isClass: true },
    { option: 'heightSize', settingBlock: HeightSize, isClass: true },
  ],
  col: [
    { option: 'bg', settingBlock: Background, isClass: true },
    { option: 'colSizeCnt', settingBlock: ColumnSizeCounts, isClass: true },
    { option: 'heightSize', settingBlock: HeightSize, isClass: true },
  ],

  textHeader: [
    { option: 'tag', settingBlock: TagHeaderTitle, isClass: false },
    { option: 'text', settingBlock: Text, isClass: false },
    { option: 'textColor', settingBlock: TextColor, isClass: true },
  ],
  paragraph: [
    { option: 'text', settingBlock: Text, isClass: false },
    { option: 'textColor', settingBlock: TextColor, isClass: true },
  ],
  image: [
    { option: 'imgSrc', settingBlock: ImgSrc, isClass: false },
    { option: 'widthSize', settingBlock: WidthSize, isClass: true },
    { option: 'heightSize', settingBlock: HeightSize, isClass: true },
  ],
}
