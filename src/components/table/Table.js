import {ExcelComponent} from '@core/ExcelComponent';

import {resize} from '@/components/table/resize';
import {isCell, matrix, shouldResize} from '@/components/table/table_helpers';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import {nextSelector} from '@core/utils';
// import * as actions from '@/redux/actions';
import {defaultStyles} from '../../constants';
import * as actions from '../../redux/actions';
import {parse} from '../../core/parse';
import {createTable} from './table.template';


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'click', 'copy', 'paste'],
      subscribeState: ['dataState'],
      ...options,
    });
    this.selectedCells = [];
  }

  prepare() {
    this.selection = new TableSelection()
  }

  toHTML() {
    return createTable(this.store.getState())
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')  
    this.selectCell($cell)

    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      const ids = this.selection.selectedIds
      this.$dispatch(actions.applyStyle({
        value,
        ids: ids,
      }))
      // debugger
    })
  }

  selectCell($cell) {
    // выделить ячейку и сообщить об этом наблюдателю
    this.selection.select($cell)
    const value = this.store.getState().dataState[this.selection.current.id()]
    this.$emit('table:select', value)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  storeChanged(changes) {
    if (Object.keys(changes.dataState).length === 0) {
      this.$root.html(createTable(this.store.getState()))
    }
  }

  async resizeTable(event) {
    try {
      const data = await resize(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const target = $target.id(true)
        const current = this.selection.current.id(true)
        const $cells = matrix(target, current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ]

    const {key} = event
    const id = this.selection.current.id(true)
    const $next = this.$root.find(nextSelector(key, id))

    if (keys.includes(key) && event.shiftKey  
    || 
    keys.includes(key) && event.ctrlKey ) {
      event.preventDefault()
      this.selection.multipleSelect($next)
    } else if (keys.includes(key)) {
      event.preventDefault()
      this.selectCell($next)
    }
  }

  onCopy(event) {
    const values = this.selection.group.map($cell => $cell.text());
    const clipboardData = event.clipboardData || window.clipboardData;
    this.selectedCells = this.selection.group
    clipboardData.setData('text', values.join('\n'));
    event.preventDefault();
  }

  onPaste(event) {
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedValues = clipboardData.getData('text').split('\n');

    const target = this.selection.current.id(true);


    this.selectedCells.forEach(($cell, index) => {
      const row = target.row + index;
      pastedValues[index].split('\t').forEach((value, colIndex) => {
        const col = target.col + colIndex;
        const $targetCell = this.$root.find(`[data-id="${row}:${col}"]`);
        this.selectCell($targetCell)
        this.updateTextInStore(value, $targetCell);
      });
    });

    this.$root.html(createTable(this.store.getState()))
    event.preventDefault();
  }

  
  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value,
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }

  onChange(event) {
    this.updateTextInStore($(event.target).text())
  }

  onClick(event) {
    const $target = $(event.target);
    if (event.target.className === 'row-info') {
      const $row = $target.closest('.row');
      this.selection.selectRow($row)
    } else if (event.target.className === 'column') {
      const columnIndex = parseInt($target.data['col']);
      const $rows = $target.closest('.excel__table').findAll(`.row`)
      this.selection.selectColumn(columnIndex, $rows );
    } 
  }
}
