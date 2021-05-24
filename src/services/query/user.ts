import { gql } from '@apollo/client'

export const FIND_ONE_USER = gql`
  query FindOneUser ($userId: Int) {
    findOneUser(userId: $userId){
      id
      name
      email
      profileUrl
      introduce
      isFollow
      originJob
      interestJob
      work
      company
      tags {
        id
      }
    }
  }
`

export const FIND_MANY_TAG = gql`
  query{
    findManyTag{
      id
      tag
      kind
    }
  }
`

