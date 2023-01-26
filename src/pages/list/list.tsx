import React from 'react'
import { Box, Chip, CircularProgress, Grid, Pagination } from '@mui/material'
import { Country } from '../../interfaces/country.interface'
import Item from './item'
import { useTable } from './hook'
import Filter from './filter'
import Group from './group'
import { GroupBy } from '../../enums/group-by-enum'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

interface Props {
  loading: boolean
  data: any
  columns: string[]
}

const Table = ({ loading, data, columns }: Props) => {
  const { page, maxPage, filteredData, search, color, selected, group, pageData, jumpPage, setSearch, setGroup, setSelected } = useTable({
    data,
    loading,
    columns,
  })

  return (
    <>
      <Grid
        container
        spacing={2}>
        <Grid
          item
          sm={12}
          md={8}
          xs={12}>
          <Filter
            search={search}
            setSearch={setSearch}
            filteredData={filteredData}
          />
        </Grid>
        <Grid
          item
          sm={12}
          md={4}
          xs={12}>
          <Group
            group={group}
            setGroup={setGroup}
          />
        </Grid>
      </Grid>

      {loading && (
        <Box sx={{ minHeight: '10rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {filteredData.length > 0 && (
        <>
          {Object.keys(pageData()).map(item => (
            <div key={item}>
              {group !== GroupBy.NONE && (
                <Chip
                  icon={<FilterAltIcon />}
                  sx={{ marginBottom: '1rem', marginTop: '1rem' }}
                  label={item}
                />
              )}
              <Grid
                container
                spacing={2}>
                {pageData()[item].map((country: Country) => (
                  <Grid
                    key={country.code}
                    item
                    sm={6}
                    md={4}
                    xs={12}>
                    <Item
                      country={country}
                      onSelect={setSelected}
                      color={color}
                      selected={selected?.code === country.code}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Pagination
              count={maxPage}
              page={page}
              onChange={(e, p) => jumpPage(p)}
              shape='rounded'
            />
          </Box>
        </>
      )}
    </>
  )
}

export default Table
