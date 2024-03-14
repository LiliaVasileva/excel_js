import {CHANGE_TEXT, TABLE_RESIZE} from '@/redux/types';
import {APPLY_STYLE, CHANGE_STYLES, CHANGE_TITLE, RESET_STATE} from './types';
// import {defaultState} from './initialState'
import {defaultStyles, defaultTitle} from '../constants';

export function rootReducer(state, action) {
  let field
  let val
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.resizerType === 'col' ? 'colState' : 'rowState'
      return {...state, [field]: value(state, field, action)} // col id, value
    case CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
      }
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value},
      }
    case CHANGE_TITLE:
      return {...state, title: action.data}
    case RESET_STATE:
      return {...state, title: defaultTitle,
        rowState: {},
        colState: {},
        dataState: {},
        stylesState: {},
        currentText: '',
        currentStyles: defaultStyles}; 
    default: return state
  }
}


function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
