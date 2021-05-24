import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import StoreProvider from '@/stores/context'
import '../scss/app.scss'
import MainPage from '@/pages/MainPage'

// eslint-disable-next-line
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../scss/app.scss')

const App: React.FC = () => (
  <StoreProvider>
    <ThemeProvider theme={theme}>
      <MainPage/>
    </ThemeProvider>
  </StoreProvider>
)

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
)
