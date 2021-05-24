import { gql } from '@apollo/client/core'

export const GET_CONTENTS = gql`
  query FindUserFeed ($take: Int!, $folderId: Int!) {
    findUserFeed(take: $take, folderId: $folderId){
      id
      url
      memo
      isUseful
      isSave
    }
  }
`
