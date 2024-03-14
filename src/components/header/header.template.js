import {defaultTitle} from '../../constants';
function toButton(button) {
  const meta = `
      data-type="button"
      data-value='${JSON.stringify(button.value)}'
    `
  return `
      <div class="button">
          <i class="material-icons" ${meta}>${button.icon}</i>
      </div>
    `
}
  
export function createHeader(title) {
  const actualTitle = title || defaultTitle
  const buttons = [
    {
      icon: 'delete',
      value: 'delete',
    },
    {
      icon: 'exit_to_app',
      value: 'exit_to_app',
    },

  ]
  return `
  <input type="text" class="input" value="${actualTitle}"/>
    <div>
    ${buttons.map(toButton).join('')}
    </div>
`
}
