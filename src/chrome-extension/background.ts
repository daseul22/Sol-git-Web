import { CreateClipPayload, MessageMethodTypes, UpdateClipPayload } from '@/types/content'
import { Folder } from '@/types/user'
import { fetchFactory } from '@/services/fetch'
// TODO: 모듈화
// import { GET_FOLDERS_QUERY } from '@/services/query/repo'

export let contentCardUrl = ''
let clipId = -1
let folders = [] as Folder[]

const getFolders = (): void => {
  const query = `
          query {
            findManyFolder{
              id
              folderName
              userId
            }
          }
        `
  fetchFactory(query)
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      folders = json.data.findManyFolder
    })
}

const postContentFeedback = (payload: UpdateClipPayload) => {
  const query = `
        mutation UpdateAction ($clipId: Int!, $isUseful: Boolean!, $isSave: Boolean!, $folderId: Int!) {
          updateAction (clipId: $clipId, isUseful: $isUseful, isSave: $isSave, folderId: $folderId) {
            id
            clipId
            folderId
          }
        }
      `
  return new Promise((resolve, reject) => {
    fetchFactory(query, payload)
      .then((res) => {
        return resolve(res)
      }).catch((error) => {
      return reject(error)
    })
  })
}

const saveContent = (payload: CreateClipPayload) => {
  const query = `
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
  return new Promise((resolve, reject) => {
    fetchFactory(query, payload)
      .then((res) => {
        return resolve(res)
      }).catch((error) => {
      return reject(error)
    })
  })
}

window.addEventListener('DOMContentLoaded', async () => {
  try {
    await getFolders()
  } catch (error) {
    console.log(error)
  }
})

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  if (request.method === MessageMethodTypes.POST_CONTENT_CARD_URL) {
    contentCardUrl = request.payload.url
    clipId = request.payload.clipId
  }
})

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.method === MessageMethodTypes.POST_CONTENT_CARD_URL) {
      contentCardUrl = request.payload
    } else if (request.method === MessageMethodTypes.GET_CONTENT_CARD_URL) {
      sendResponse({
        data: {
          clipId: clipId,
          url: contentCardUrl
        }
      })
      contentCardUrl = ''
    } else if (request.method === MessageMethodTypes.GET_FOLDERS) {
      sendResponse({ data: folders })
    } else if (request.method === MessageMethodTypes.POST_CONTENT_FEEDBACK) {
      await postContentFeedback(request.payload)
    } else if (request.method === MessageMethodTypes.POST_CONTENT_SAVE) {
      await saveContent(request.payload)
    }
  }
)
