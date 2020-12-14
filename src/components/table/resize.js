import {$} from '@core/dom';

export function resize($root, event) {
  return new Promise(resolve => {
    const resizerType = event.target.dataset.resize
    if (resizerType) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coordinates = $parent.getCoordinates()
      const sideProp = resizerType === 'col' ? 'bottom' : 'right'
      let value

      $resizer.setCss({
        opacity: 1,
        [sideProp]: '-5000px',
      })

      if (resizerType === 'col') {
        document.onmousemove = e => {
          const delta = e.pageX - coordinates.right
          value = (coordinates.width + delta) + 'px'
          $resizer.setCss({
            right: -delta + 'px',
          })
        }
      } else if (resizerType === 'row') {
        document.onmousemove = e => {
          const delta = e.pageY - coordinates.bottom
          value = (coordinates.height + delta) + 'px'
          $resizer.setCss({
            bottom: -delta + 'px',
          })
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if (resizerType === 'col') {
          const colNumber = $parent.data.col
          const cells = $root.findAll(`[data-col="${colNumber}"]`)
          $parent.setCss({width: value})
          cells.forEach(el => $(el).setCss({width: value}))
          $resizer.setCss({
            right: 0,
          })
        } else if (resizerType === 'row') {
          $parent.setCss({height: value})
          $resizer.setCss({
            bottom: 0,
          })
        }

        resolve({
          value,
          resizerType,
          id: resizerType === 'col' ? $parent.data.col : $parent.data.row,
        })

        $resizer.setCss({
          opacity: 0,
          [sideProp]: 0,
        })
      }
    }
  })
}
