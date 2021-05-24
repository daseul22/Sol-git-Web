import { CreateClipPayload, UpdateClipPayload } from '@/types/content'

const APIServer = process.env.REACT_APP_API_SERVER ? process.env.REACT_APP_API_SERVER : ''
const APIServerProduction = process.env.REACT_APP_API_SERVER_PRODUCTION ? process.env.REACT_APP_API_SERVER_PRODUCTION : ''

// TODO: 배포 전에 수정
const url = process.env.NODE_ENV === 'development' ? APIServer : APIServerProduction

export const fetchFactory = (queryOrMutation: string, payload?: UpdateClipPayload | CreateClipPayload) => {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: queryOrMutation,
      variables: payload
    })
  })
}
