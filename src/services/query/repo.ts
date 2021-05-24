import { gql } from '@apollo/client/core'

export const GET_FOLDERS = gql`
  query {
    findManyFolder{
      id
      folderName
      userId
    }
  }
`

export const GET_FOLDERS_QUERY = `
  query {
    findManyFolder{
      id
      folderName
      userId
    }
  }
`
