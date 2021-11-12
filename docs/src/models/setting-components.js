import { TagHeaderTitle } from '../classes/seting_blocks/TagHeaderTitle.js'
import { Text } from '../classes/seting_blocks/Text.js'

export const SETTINGS_MODEL = {
  textHeader: [
    { option: 'tag', settingBlock: TagHeaderTitle },
    { option: 'text', settingBlock: Text },
  ],
  paragraph: [{ option: 'text', settingBlock: Text }],
}
