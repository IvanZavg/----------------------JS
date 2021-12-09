import { COMPONENTS_MODEL } from '../../models/constructor-components.js'

class FabricConstructorComponents {
  create(componentType, options) {
    const Component = COMPONENTS_MODEL[componentType]
    return new Component['elementClass']({ ...Component['options'], ...options })
  }
}

export default new FabricConstructorComponents()
