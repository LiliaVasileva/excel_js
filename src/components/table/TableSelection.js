export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus().addCssClass(TableSelection.className)
  }

  clear() {
    this.group.forEach(($el => $el.removeCssClass(TableSelection.className)))
    this.group = []
  }

  get selectedIds() {
    // debugger
    const ids = this.group.map(el => el.$el.dataset.id)
    return ids
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addCssClass(TableSelection.className))
  }

  applyStyle(style) {
    this.group.forEach($el => $el.setCss(style))
  }
}
