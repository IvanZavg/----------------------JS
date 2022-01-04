import { TagHeaderTitle } from '../components/setting_components/TagHeaderTitle.js'
import { Text } from '../components/setting_components/Text.js'
import { Background } from '../components/setting_components/Background.js'
import { TextColor } from '../components/setting_components/TextColor.js'
import { ImgSrc } from '../components/setting_components/ImgSrc.js'
import { WidthSize } from '../components/setting_components/WidthSize.js'
import { HeightSize } from '../components/setting_components/HeightSize.js'
import { ColumnSizeCounts } from '../components/setting_components/ColumnSizeCounts.js'
import { ButtonStyle } from '../components/setting_components/ButtonStyle.js'
import { VerticalColAlign } from '../components/setting_components/VerticalColAlign.js'
import { HorizontalColAlign } from '../components/setting_components/HorizontalColAlign.js'

export const SETTINGS_MODEL = {
  row: [
    { option: 'bg', settingBlock: Background, isClass: true },
    { option: 'heightSize', settingBlock: HeightSize, isClass: true }
  ],
  col: [
    { option: 'bg', settingBlock: Background, isClass: true },
    { option: 'colSizeCnt', settingBlock: ColumnSizeCounts, isClass: true },
    { option: 'heightSize', settingBlock: HeightSize, isClass: true },
    {
      option: 'verticalColAlign',
      settingBlock: VerticalColAlign,
      isClass: true
    },
    {
      option: 'horizontalColAlign',
      settingBlock: HorizontalColAlign,
      isClass: true
    }
  ],

  textHeader: [
    { option: 'tag', settingBlock: TagHeaderTitle, isClass: false },
    { option: 'text', settingBlock: Text, isClass: false },
    { option: 'textColor', settingBlock: TextColor, isClass: true }
  ],
  paragraph: [
    { option: 'text', settingBlock: Text, isClass: false },
    { option: 'textColor', settingBlock: TextColor, isClass: true }
  ],
  image: [
    { option: 'imgSrc', settingBlock: ImgSrc, isClass: false },
    { option: 'widthSize', settingBlock: WidthSize, isClass: true },
    { option: 'heightSize', settingBlock: HeightSize, isClass: true }
  ],
  button: [
    { option: 'text', settingBlock: Text, isClass: false },
    { option: 'textColor', settingBlock: TextColor, isClass: true },
    { option: 'button-style', settingBlock: ButtonStyle, isClass: true }
  ]
}
