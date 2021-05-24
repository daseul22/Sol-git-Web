import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const APIServer = process.env.REACT_APP_API_SERVER ? process.env.REACT_APP_API_SERVER : ''
const APIServerProduction = process.env.REACT_APP_API_SERVER_PRODUCTION ? process.env.REACT_APP_API_SERVER_PRODUCTION : ''

export const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? APIServer : APIServerProduction,
  cache: new InMemoryCache({
    resultCaching: false
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  },
  credentials: 'include'
})
