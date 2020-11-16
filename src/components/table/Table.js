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
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coordinates = $parent.getCoordinates()

      if (event.target.dataset.resize === 'col') {
        document.onmousemove = e => {
          const colNumber = $parent.data.col
          const delta = e.pageX - coordinates.right
          const value = coordinates.width + delta
          $parent.$el.style.width = value + 'px'

          document.querySelectorAll(`[data-col="${colNumber}"]`)
              .forEach(el => el.style.width = value + 'px')
        }
      } else if (event.target.dataset.resize === 'row') {
        document.onmousemove = e => {
          const delta = e.pageY - coordinates.bottom
          // console.log(delta)
          $parent.$el.style.height = (coordinates.height + delta) + 'px'
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
