import Row from '../components/constructor_components/Row.js'
import Col from '../components/constructor_components/Col.js'
import TextHeader from '../components/constructor_components/TextHeader.js'
import Paragraph from '../components/constructor_components/Paragraph.js'
import Image from '../components/constructor_components/Image.js'
import Button from '../components/constructor_components/Button.js'

export const COMPONENTS_MODEL = {
  row: {
    type: 'row',
    title: 'Блок строка',
    elementClass: Row,
    options: {
      tag: 'div',
      classes: ['row', 'container']
    }
  },

  col: {
    type: 'col',
    title: 'Блок колонка',
    elementClass: Col,
    options: {
      tag: 'div',
      classes: ['col']
    }
  },

  textHeader: {
    type: 'textHeader',
    title: 'Заголовок',
    elementClass: TextHeader,
    options: {
      tag: 'h1'
    }
  },

  paragraph: {
    type: 'paragraph',
    title: 'Параграф',
    elementClass: Paragraph,
    options: {
      tag: 'p'
    }
  },

  image: {
    type: 'image',
    title: 'Картинка',
    elementClass: Image,
    options: {
      tag: 'img'
    }
  },
  button: {
    type: 'button',
    title: 'Кнопка',
    elementClass: Button,
    options: {
      tag: 'button',
      classes: ['btn']
    }
  }
}
