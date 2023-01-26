import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import styled from '@emotion/styled'
import { Chip } from '@mui/material'
import { Country } from '../../interfaces/country.interface'
import { getLanguageColor } from '../utils'

interface Props {
  country: Country
  selected: boolean
  color: string
  onSelect: (params: any) => any
}

const Continent = styled(({ children }: { children: string }) => {
  return <span> {children}</span>
})(() => ({
  marginLeft: 'auto',
}))

const Item = ({ country, selected, color, onSelect }: Props) => {
  const { code, emoji, name, continent, languages } = country

  return (
    <Card
      sx={{
        backgroundColor: `${selected ? color : 'default'}.dark`,
      }}
      onClick={() => onSelect(country)}>
      <CardContent>
        <Typography
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          color='text.secondary'
          gutterBottom>
          {emoji} {code} <Continent>{continent.name}</Continent>
        </Typography>
        <Typography
          noWrap
          variant='h5'
          component='div'>
          {name}
        </Typography>
        {languages.length > 0 ? (
          languages.slice(0, 4).map((language): any => (
            <RenderLanguage
              key={language.code}
              code={language.code}
            />
          ))
        ) : (
          <RenderLanguage code='N/A' />
        )}
      </CardContent>
    </Card>
  )
}

interface RenderLanguage {
  code: string
}

const RenderLanguage = ({ code }: RenderLanguage) => {
  return (
    <Chip
      sx={{ margin: '1rem 0.25rem 0.25rem 0', padding: '0 0.2rem' }}
      label={code}
      color={getLanguageColor(code)}
      variant='outlined'
    />
  )
}

export default Item
