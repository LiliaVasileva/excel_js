import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '../../core/dom';
import {changeTitle, resetState} from '../../redux/actions';
import {createHeader} from './header.template';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  get template() {
    return createHeader(this.store.getState().title)
  }

  toHTML() {
    return this.template
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)
    const value = JSON.parse($target.data.value)
    if (value === 'delete') {
      this.$dispatch(resetState())
    }
  }
}
