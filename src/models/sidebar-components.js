import Row from '../classes/components/Row.js'
import Col from '../classes/components/Col.js'
import TextHeader from '../classes/components/TextHeader.js'
import Paragraph from '../classes/components/Paragraph.js'
import Image from '../classes/components/Image.js'

export const COMPONENTS_MODEL = {
  row: {
    type: 'row',
    title: 'Блок строка',
    elementClass: Row,
    options: {
      tag: 'div',
      classes: ['container'],
    },
  },

  col: {
    type: 'col',
    title: 'Блок колонка',
    elementClass: Col,
    options: {
      tag: 'div',
    },
  },

  textHeader: {
    type: 'textHeader',
    title: 'Заголовок',
    elementClass: TextHeader,
    options: {
      tag: 'h1',
    },
  },

  paragraph: {
    type: 'paragraph',
    title: 'Параграф',
    elementClass: Paragraph,
    options: {
      tag: 'p',
    },
  },

  image: {
    type: 'image',
    title: 'Картинка',
    elementClass: Image,
    options: {
      tag: 'img',
    },
  },
}
