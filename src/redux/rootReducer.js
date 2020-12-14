import {TABLE_RESIZE} from '@/redux/types';

export function rootReducer(state, action) {
  let prevColState
  switch (action.type) {
    case TABLE_RESIZE:
      prevColState = state.colState || {}
      prevColState[action.data.id] = action.data.value
      return {...state, colState: prevColState} // col id, value
    default: return state
  }
}
