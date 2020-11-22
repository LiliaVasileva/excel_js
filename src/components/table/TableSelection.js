export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
  }

  // $el - instance of DOM
  select($el) {
    this.clear()
    this.group.push($el)
    $el.addCssClass(TableSelection.className)
  }

  clear() {
    this.group.forEach(($el => $el.removeCssClass(TableSelection.className)))
    this.group = []
  }

  selectGroup() {

  }
}
