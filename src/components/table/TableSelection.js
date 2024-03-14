import {$} from '@core/dom';
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

  selectRow($row) {
    this.clear();
    const $cells = Array.from($row.$el.querySelectorAll('[data-type="cell"]'));
    this.group = $cells.map(el => $(el));
    this.group.forEach($el => $el.addCssClass(TableSelection.className));
  }
  

  selectColumn(colIndex, $rows) {
    this.clear()
    const rowsArray = Array.from($rows);
    rowsArray.forEach(row => {
      const $cells = Array.from(row.querySelectorAll('.cell'));
      if ($cells.length > colIndex) {
        const $cell = $($cells[colIndex]);
        this.group.push($cell);
        $cell.addCssClass(TableSelection.className);
      }
    });
  }
}
