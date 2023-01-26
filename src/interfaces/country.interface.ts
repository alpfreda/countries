import { Continent } from './continent.interface'
import { Language } from './language.interface'

export interface Country {
  code: string
  name: string
  emoji: string
  continent: Continent
  languages: Language[]
}
