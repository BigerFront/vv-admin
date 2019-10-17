
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

/**
 * @DateTime 2019-10-17
 * @param    {number}   time
 * @param    {[string]}   option
 * @return   {[string]}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time += time
  }

  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }

  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() + 1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
    )
  }
}

export function param2Obj(url) {
  const search = url.split('?')[1]

  if (!search) {
    return {}
  }

  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * convert url parameters to object
 * @DateTime 2019-10-17
 * @param    {[string]}   url [xx?a=b&c=8]
 * @return   {[object]}     key-value pairs
 */
export function parseURLParam(url) {
  const search = url.split('?')[1]

  if (!search) {
    return {}
  }

  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}
