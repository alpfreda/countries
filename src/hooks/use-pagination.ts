import { useCallback, useState } from 'react'
import { PAGE_SIZE } from '../constants'
import { Country } from '../interfaces/country.interface'
import { parseParam } from '../pages/utils'

const usePagination = (data: any, group: string) => {
  const [page, setPage] = useState(1)
  const maxPage = Math.ceil(data.length / PAGE_SIZE)

  const pageData = () => {
    const start = (page - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE

    return data
      .sort((a: any, b: any) => parseParam(a, group).localeCompare(parseParam(b, group)))
      .slice(start, end)
      .reduce((obj: any, next: Country) => {
        const param = parseParam(next, group)
        if (obj[param]) {
          obj[param].push(next)
        } else {
          obj[param] = [next]
        }
        return obj
      }, {})
  }

  const nextPage = () => {
    setPage(page => Math.min(page + 1, maxPage))
  }

  const prevPage = () => {
    setPage(page => Math.max(page - 1, 1))
  }

  const jumpPage = useCallback(
    (page: number) => {
      const pageNumber = Math.max(1, page)
      setPage(Math.min(pageNumber, maxPage))
    },
    [maxPage],
  )

  return { nextPage, prevPage, jumpPage, pageData, page, maxPage }
}

export default usePagination
