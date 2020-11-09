import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener!')
    }
    this.$root = $root
    this.listeners = listeners
    this.name = '' // overridden in specific classes
  }

  initDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} Component`
        )
      }
      // То же самое, что addEventListener
      this[method] = this[method].bind(this)
      // Because we need to take context in other methods
      // bind - because otherwise the context is lost
      this.$root.on(listener, this[method])
    })
  }

  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  // for each 'listener' method's name should be 'onListener'
  return 'on' + capitalize(eventName)
}
