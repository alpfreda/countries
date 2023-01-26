import { COLORS, LANGUAGES } from '../constants'

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * COLORS.length)
  return COLORS[randomIndex]
}

let index = 0
const languagesWithColors = LANGUAGES.reduce((a, b) => {
  index = index === COLORS.length ? 0 : index + 1
  return { ...a, [b]: COLORS[index] }
}, {})

export const getLanguageColor = (code: string) => {
  return languagesWithColors[code] || 'default'
}

export const parseParam = (item: any, group: string) => `${group.split('.').reduce((a, b) => a[b], item)}`