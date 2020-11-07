import {ExcelComponent} from '@core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  toHTML() {
    return `
            <div class="row">

                <div class="row-info"></div>

                <div class="row-data">

                    <div class="column">a</div>
                    <div class="column">b</div>
                    <div class="column">c</div>

                </div>

            </div>
             <div class="row">

                <div class="row-info">1</div>

                <div class="row-data">
                    <div class="cell selected" contenteditable="true">11</div>
                    <div class="cell" contenteditable="true">22</div>
                    <div class="cell" contenteditable="true">33</div>
                </div>

            </div>
    `
  }
}
