export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  // $el - instance of DOM
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

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addCssClass(TableSelection.className))
  }
}
