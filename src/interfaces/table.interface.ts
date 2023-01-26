import { Country } from './country.interface'

export interface Table {
  data: Country[]
  loading: boolean
  columns: string[]
}
