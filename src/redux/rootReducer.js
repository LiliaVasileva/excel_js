import {TABLE_RESIZE} from '@/redux/types';

export function rootReducer(state, action) {
  let prevColState
  let field
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.resizerType === 'col' ? 'colState' : 'rowState'
      prevColState = state[field] || {}
      prevColState[action.data.id] = action.data.value
      return {...state, [field]: prevColState} // col id, value
    default: return state
  }
}
