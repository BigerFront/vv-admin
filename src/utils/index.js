
/**
 * parse the time to string
 * @DateTime 2019-10-16
 * @param    {[Object|string|number]}   time
 * @param    {string}   cFormat []
 * @return   {[string]}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date

  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }

  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let val = formatObj[key]

    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][val]
    }

    if (result.length > 0 && val < 10) {
      val = '0' + val
    }

    return val || 0
  })

  return time_str
}
