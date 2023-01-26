import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './components/layout'
import List from './pages/list'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const Index = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <List />
      </Layout>
    </ThemeProvider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
