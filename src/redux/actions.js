import {CHANGE_TEXT, TABLE_RESIZE} from '@/redux/types';
import {APPLY_STYLE, CHANGE_STYLES, CHANGE_TITLE, RESET_STATE} from './types';

export function tableResize(data) {
  // Action creator
  return {
    type: TABLE_RESIZE,
    data,
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  }
}


export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data,
  }
}


// value, ids
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  }
}


export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data,
  }
}

export function resetState() {
  return {
    type: RESET_STATE,
  };
}
