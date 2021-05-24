import React from 'react'
import AppRouter from './routers'
import { ApolloProvider } from '@apollo/client/react'
import { ThemeProvider } from 'styled-components'
import '@/scss/app.scss'
import StoreProvider from '@/stores/context'
import { client } from '@/services/apollo-client'

// eslint-disable-next-line
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./scss/app.scss')

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <AppRouter/>
      </ThemeProvider>
    </StoreProvider>
  </ApolloProvider>
)

export default App
