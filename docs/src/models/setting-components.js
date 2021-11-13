import { TagHeaderTitle } from '../classes/seting_blocks/TagHeaderTitle.js'
import { Text } from '../classes/seting_blocks/Text.js'
import { Background } from '../classes/seting_blocks/Background.js'

export const SETTINGS_MODEL = {
  row: [{ option: 'bg', settingBlock: Background, isClass: true }],
  col: [{ option: 'bg', settingBlock: Background, isClass: true }],
  textHeader: [
    { option: 'tag', settingBlock: TagHeaderTitle, isClass: false },
    { option: 'text', settingBlock: Text, isClass: false },
  ],
  paragraph: [{ option: 'text', settingBlock: Text, isClass: false }],
}
