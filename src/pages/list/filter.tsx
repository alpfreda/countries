import * as React from 'react'
import Divider from '@mui/material/Divider'
import { Badge, IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
  search?: string
  filteredData: any
  setSearch: (value: string) => void
}

const Filter = ({ setSearch, search, filteredData }: Props) => (
  <Paper
    component='form'
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder='Search... (code, name)'
    />
    <IconButton
      type='button'
      sx={{ p: '10px' }}
      aria-label='search'>
      <SearchIcon />
    </IconButton>
    <Divider
      sx={{ height: 28, m: 0.5 }}
      orientation='vertical'
    />
    <Badge
      color='primary'
      sx={{ p: '0.5rem', width: '4rem', justifyContent: 'center' }}>
      {(filteredData.length || 0).toLocaleString()}
    </Badge>
  </Paper>
)

export default Filter
