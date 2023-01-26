import * as React from 'react'
import { styled, alpha, darken } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PaidIcon from '@mui/icons-material/Paid'
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import CheckIcon from '@mui/icons-material/Check'
import { GroupBy } from '../../enums/group-by-enum'

const Groups = [
  { code: GroupBy.NONE, name: 'None', Icon: <RemoveCircleOutlineIcon /> },
  { code: GroupBy.CONTINENT, name: 'Continent', Icon: <SouthAmericaIcon /> },
  { code: GroupBy.CURRENCY, name: 'Currency', Icon: <PaidIcon /> },
]

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    width: '15rem',
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}))

export default function Group({ group, setGroup }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (type: string) => {
    setGroup(type)
  }

  const renderItems = Groups.map(groupItem => (
    <MenuItem
      key={groupItem.code}
      sx={{ backgroundColor: groupItem ? 'inherit' : 'primary' }}
      onClick={() => handleSelect(groupItem.code)}
      disableRipple>
      {groupItem.Icon}
      {groupItem.name}
      {group === groupItem.code && <CheckIcon sx={{ marginLeft: 'auto' }} />}
    </MenuItem>
  ))

  return (
    <div>
      <Button
        sx={{
          backgroundColor: '#1e1e1e',
          color: '#fff',
          '&:hover': {
            backgroundColor: darken('#1e1e1e', 0.3),
          },
          textTransform: 'none',
          marginBottom: '1rem',
          p: '0.65rem',
          width: '100%',
        }}
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        size='large'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}>
        Grouped by: {Groups.find(innerGroup => innerGroup.code === group)?.name}
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        {renderItems}
      </StyledMenu>
    </div>
  )
}
