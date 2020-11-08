import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
  }

  // Returns component's template
  toHTML() {
    return ''
  }

  init() {
    this.initDomListeners()
  }
}
