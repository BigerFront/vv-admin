import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vultr Vue Admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  } else {
    return `${title}`
  }
}
