import {TABLE_RESIZE} from '@/redux/types';

export function tableResize(data) {
  // Action creator
  return {
    type: TABLE_RESIZE,
    data,
  }
}
