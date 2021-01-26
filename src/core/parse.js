export function parse(value = '') {
  if (value.startsWith('=')) {
    return eval(value.slice(1))
  }
  return value
}
