import React from 'react'
import { Box, Divider, List, Drawer, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { DRAWER_WIDTH, MENUS } from '../../constants'

interface Props {
  mobileOpen: boolean
  handleDrawerToggle: () => void
}

const LayoutDrawer = ({ mobileOpen, handleDrawerToggle }: Props) => {
  return (
    <Box component='nav'>
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}>
        <Box
          onClick={handleDrawerToggle}
          sx={{ textAlign: 'center' }}>
          <Typography
            variant='h6'
            sx={{ my: 2 }}>
            Countries
          </Typography>
          <Divider />
          <List>
            {MENUS.map((menu: string) => (
              <ListItem
                key={menu}
                disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={menu} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}

export default LayoutDrawer
