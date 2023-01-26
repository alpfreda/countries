import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client'
import { useEffect, useMemo, useState } from 'react'
import usePagination from '../../hooks/use-pagination'
import { Country } from '../../interfaces/country.interface'
import { getRandomColor } from '../utils'
import { GroupBy } from '../../enums/group-by-enum'
import { Table } from '../../interfaces/table.interface'
console.log(process.env.REACT_APP_API_URI)
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_API_URI,
})

const query = gql`
  {
    countries {
      name
      code
      emoji
      currency
      continent {
        name
      }
      languages {
        code
        name
      }
    }
  }
`

const useFetch = () => {
  const { data, loading, error } = useQuery(query, { client })

  return { data, loading, error }
}

const getNewColor = (currentColor: string) => {
  const color = getRandomColor()
  return color === currentColor ? getNewColor(currentColor) : color
}

const useTable = ({ data, loading, columns }: Table) => {
  const [search, setSearch] = useState<string>('')
  const [selected, setSelected] = useState<Country>(null)
  const [group, setGroup] = useState<string>(GroupBy.NONE)
  const [color, setSelectedColor] = useState<string>(null)

  const filteredData = useMemo(
    () =>
      data.filter(
        (item: Country) =>
          !search || columns.some((filterableField: any) => (item[filterableField] || '').toString().toLowerCase().includes(search.toString().toLowerCase())),
      ),
    [search, data, loading],
  )

  const { pageData, page, maxPage, jumpPage } = usePagination(filteredData, group)

  useEffect(() => {
    const newColor = getNewColor(color)
    setSelectedColor(newColor)
  }, [selected])

  useEffect(() => {
    if (search !== undefined || search !== null) {
      jumpPage(1)
    }
  }, [search, jumpPage])

  useEffect(() => {
    const selectableItemIndex = Math.min(filteredData.length - 1, 10)
    setSelected(filteredData[selectableItemIndex] || null)
  }, [filteredData, group])

  return { page, maxPage, search, color, selected, filteredData, group, setGroup, pageData, jumpPage, setSearch, setSelected }
}

export { useFetch, useTable }
