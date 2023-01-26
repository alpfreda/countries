import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Container, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LayoutDrawer from './drawer'
import { MENUS } from '../../constants'

interface Props {
  children: any
  window?: () => Window
}

export default function DrawerAppBar({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  return (
    <Container
      maxWidth='md'
      sx={{ marginTop: '1rem' }}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position='static'
          component='nav'>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Countries
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {MENUS.map(item => (
                <Button
                  key={item}
                  sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <LayoutDrawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>
      <Box sx={{ marginTop: '1rem' }}>{children}</Box>
    </Container>
  )
}
