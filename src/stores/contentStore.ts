import { ActionType, Content, MessageMethodTypes } from '@/types/content'
import { client } from '@/services/apollo-client'
import {
  CREATE_ACTION,
  CREATE_FOLDER
} from '@/services/mutation/content'
import { FetchResult } from '@apollo/client'
import { GET_CONTENTS } from '@/services/query/content'

export type ContentStore = {
  limit: number;
  usefulContents: string[];
  savedContents: { url: string; folder: string }[];
  savedUrls: string[];
  currFolderContents: Content[];
  setCurrFolderContents: (payload: Content[]) => void;
  sendUrlToBackground: (
    clipId: number,
    url: string,
    folders: { id: number; folderName: number }[]
  ) => void;
  createAction: (
    actionType: ActionType,
    clipId: number
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  createFolder: (
    payload: string
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  getUserContents: (
    payload: number
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
};

const chromeExtensionId = process.env.REACT_APP_CHROME_EXTENSION_ID

export const contentStore = (): ContentStore => {
  const store: ContentStore = {
    usefulContents: [],
    savedContents: [],
    savedUrls: [],
    limit: 20,
    currFolderContents: [],
    setCurrFolderContents (contents: Content[]) {
      this.currFolderContents = contents
    },
    async createAction (actionType: ActionType, clipId: number) {
      return new Promise((resolve, reject) => {
        client
          .mutate({
            mutation: CREATE_ACTION,
            variables: {
              actionType,
              clipId
            }
          })
          .then((result) => {
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    sendUrlToBackground (
      clipId: number,
      url: string,
      folders: { id: number; folderName: number }[]
    ) {
      if (chromeExtensionId) {
        chrome.runtime.sendMessage(chromeExtensionId, {
          method: MessageMethodTypes.POST_CONTENT_CARD_URL,
          payload: {
            clipId,
            url,
            folders
          }
        })
      }
    },
    createFolder (folderName: string) {
      return new Promise((resolve, reject) => {
        client
          .mutate({
            mutation: CREATE_FOLDER,
            variables: { folderName }
          })
          .then((result) => {
            return resolve(result)
          })
          .catch((error) => {
            return reject(error)
          })
      })
    },
    async getUserContents (folderId: number) {
      return new Promise((resolve, reject) => {
        client
          .query({
            query: GET_CONTENTS,
            variables: {
              take: this.limit,
              folderId
            }
          })
          .then((result) => {
            //this.setCurrFolderContents(result.data.findUserFeed)
            if (folderId === 1) {
              this.setCurrFolderContents(dummy['분류 안됨'])
            } else if (folderId % 2 === 0) {
              this.setCurrFolderContents(dummy['front-end'])
            } else if (folderId % 2 === 1) {
              this.setCurrFolderContents(dummy['back-end'])
            }

            return resolve(result)
          })
          .catch((error) => {
            return reject(error)
          })
      })
    }
  }
  return store
}

const dummy = {
  '분류 안됨': [
    {
      id: 1,
      url:
        'https://velog.io/@juno7803/React-useRef-200-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0',
      memo: 'React useRef 활용!!',
      isUseful: true,
      isSave: true
    },
    {
      id: 1,
      url: 'https://tech.madup.com/swr-intro1/',
      memo: 'Redux대신 SWR!!',
      isUseful: true,
      isSave: true
    },
    {
      id: 1,
      url:
        'https://velog.io/@huurray/SOLID-%EC%9B%90%EC%B9%99%EC%97%90-%EA%B8%B0%EC%B4%88%ED%95%9C-React-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1%EB%B2%95',
      memo: 'React SOLID원칙에 대한 요약!',
      isUseful: true,
      isSave: true
    }
  ],
  'front-end': [
    {
      id: 1,
      url:
        'https://css-tricks.com/comparing-the-new-generation-of-build-tools/',
      memo: 'CSS + HTML / Basic',
      isUseful: true,
      isSave: true
    },
    {
      id: 1,
      url:
        'https://uxplanet.org/new-to-ux-design-feeling-overwhelmed-40ea8e330ab1?source=collection_category---4------0-----------------------',
      memo: 'UX design',
      isUseful: true,
      isSave: true
    },
    {
      id: 1,
      url:
        'https://uxplanet.org/design-career-how-to-get-a-design-job-you-dream-about-ef3676a36b7b?source=collection_category---4------0-----------------------',
      memo: 'Career',
      isUseful: true,
      isSave: true
    }
  ],
  'back-end': [
    {
      id: 1,
      url: 'https://han41858.tistory.com/55',
      memo: 'Deno와 node는 무엇이 다른지!',
      isUseful: true,
      isSave: true
    },
    {
      id: 1,
      url: 'https://kdydesign.github.io/2020/08/27/mono-repo-lerna-example/',
      memo: 'Mono-Repo 구축을 도와주는 Lerna에 대해 잘 설명되있음!',
      isUseful: true,
      isSave: true
    },
    {
      id: 1,
      url: 'http://sculove.github.io/blog/2019/06/09/nodejs-memoryleak/',
      memo: 'Memory leak이 왜 문제가 되는지 잘 설명해줌!',
      isUseful: true,
      isSave: true
    }
  ]
}
