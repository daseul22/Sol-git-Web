import { gql } from '@apollo/client'

export const CREATE_FOLDER = gql`
  mutation CreateFolder ($folderName: String!){
    createFolder(folderName: $folderName){
      id
      folderName
      userId
    }
  }
`

export const POST_CONTENT_FEEDBACK_MUTATION = `
  mutation UpdateAction ($clipId: Int!, $isUseful: Boolean!, $isSave: Boolean!, $folderId: Int!) {
    updateAction (clipId: $clipId, isUseful: $isUseful, isSave: $isSave, folderId: $folderId) {
      id
      clipId
      folderId
    }
  }
`

export const CREATE_ACTION = gql`
  mutation CreateAction ($actionType: String!, $clipId: Int!) {
    createAction(actionType: $actionType, clipId: $clipId){
      id
      User {
        id
      }
      clipId
      isUseful
      isSave
      isRead
      folderId
    }
  }
`

export const SAVE_CONTENT_MUTATION = `
  mutation CreateClip ($folderId: Int!, $isPrivate: Boolean!, $url: String!, $memo: String) {
    createClip(folderId: $folderId, isPrivate: $isPrivate, url: $url, memo: $memo){
      id
      url
      memo
      createdAt
      action {
        id
      }
    }
  }
 `
