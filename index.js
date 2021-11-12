import Site from './classes/Site.js'

const content = [
  { perentId: 'root', id: 'fef6a3ba-86ce-5dd2-64c4-d932de2b0909', componentType: 'row' },
  {
    perentId: 'fef6a3ba-86ce-5dd2-64c4-d932de2b0909',
    id: 'ebf0a727-6a9a-5ef9-7c56-f8aa8fbe9385',
    componentType: 'textHeader',
    options: { text: 'Title1' },
  },
  {
    perentId: 'fef6a3ba-86ce-5dd2-64c4-d932de2b0909',
    id: '34f28aaa-dec7-3de8-edf4-6e918c6fbb5b',
    componentType: 'paragraph',
    options: { text: 'vahahahah' },
  },
]
const site = new Site('#site')
site.runData(content)

// site.addComponent('row')
site.testSetActiveComponent(0)
// site.addComponent('textHeader', { text: 'Title1' })
// site.addComponent('paragraph', { text: 'vahahahah' })
// site.testLogContent()
