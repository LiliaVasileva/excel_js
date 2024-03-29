import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribeState = options.subscribeState || []
    this.store = options.store
    this.unsubscribers = []
    // this.storeSub = null

    this.prepare()
  }

  prepare() {
    // Настраиваем наш компонент до init

  }

  toHTML() {
    // Returns component's template
    return ''
  }

  $emit(event, ...args) {
    // уведомляем слушателей про событие event
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    // подписываемся на событие event
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    // изменение состояния
    this.store.dispatch(action)
  }

  storeChanged() {
    // Сюда приходят только изменения по тем полям, на которые мы подписались
  }

  isWatching(key) {
    return this.subscribeState.includes(key)
  }

  init() {
    // инициализируем компонент
    // добавляем DOM-слушателей
    this.initDomListeners()
  }

  destroy() {
    // удалям компонент
    // чистим DOM-слушателей
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => {
      unsub()
    })
    // this.storeSub.unsubscribe()
  }
}
