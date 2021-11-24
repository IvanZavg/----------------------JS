import { COMPONENTS_MODEL } from '../models/sidebar-components.js'

class ComponentFab {
  create(componentType, options) {
    const Component = COMPONENTS_MODEL[componentType]
    return new Component['elementClass']({ ...Component['options'], ...options })
  }
}

export const componentFabric = new ComponentFab()
