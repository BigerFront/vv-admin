/**
 * @DateTime 2019-10-17
 * @param    {string}   path [description]
 * @return   {Boolean}       [description]
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validUsername(str) {
  const valid_map = ['admin', 'editor']

  return valid_map.indexOf(str.trim()) >= 0
}
