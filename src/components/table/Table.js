import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    const resizer = event.target.dataset.resize
    if (resizer) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coordinates = $parent.getCoordinates()

      const colNumber = $parent.data.col
      const cells = this.$root.findAll(`[data-col="${colNumber}"]`)

      if (resizer === 'col') {
        document.onmousemove = e => {
          const delta = e.pageX - coordinates.right
          const value = coordinates.width + delta
          $parent.setCss({width: value + 'px'})
          cells.forEach(el => $(el).setCss({width: value + 'px'}))
        }
      } else if (resizer === 'row') {
        document.onmousemove = e => {
          const delta = e.pageY - coordinates.bottom
          const value = coordinates.height + delta
          $parent.setCss({height: value + 'px'})
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
