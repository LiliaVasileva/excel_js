class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector) // string
      : selector // DOM-node
  }

  html(html) {
    // getter/setter
    // $('div').html('<h1>Test</h1>).clear()
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      // If method append() in base-class
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoordinates() {
    return this.$el.getBoundingClientRect()
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  /*
  * {
  *   height: '30px',
  *   weight: '42px',
  *   backgroundColor: red
  * }
  * */
  setCss(styles = {}) {
    Object
        .entries(styles)
        .forEach(
            ([param, value]) => this.$el.style[param] = value
        )
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1],
      }
    }
    return this.data.id
  }

  focus() {
    this.$el.focus()
    return this
  }

  addCssClass(className) {
    this.$el.classList.add(className)
  }

  removeCssClass(className) {
    this.$el.classList.remove(className)
  }

  get data() {
    return this.$el.dataset
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
