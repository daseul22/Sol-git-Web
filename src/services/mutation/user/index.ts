import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation AuthorizeWithGoogle ($googleIdToken: String!) {
    authorizeWithGoogle(googleIdToken: $googleIdToken){
      id
      name
      email
      profileUrl
      introduce
      originJob
      interestJob
      tags {
        id
      }
      work
      company
    }
  }
`

export const USER_REGISTER = gql`
  mutation UserRegister($googleIdToken: String!, $originJob: String!, $interestJob: String!, $tags: [Int!]!, $work: String!, $company: String!) {
    userRegister(googleIdToken: $googleIdToken, originJob: $originJob, interestJob: $interestJob, tags: $tags, work: $work, company: $company) {
      id
      name
      email
      profileUrl
      introduce
      originJob
      interestJob
    }
  }
`
