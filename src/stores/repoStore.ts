import { client } from '@/services/apollo-client'
import { GET_FOLDERS } from '@/services/query/repo'
import { CREATE_FOLDER } from '@/services/mutation/content'
import { FetchResult } from '@apollo/client'
import { Folder } from '@/types/user' // repo type 분리

export type RepoStore = {
  currFolderId: number;
  isEditMode: boolean;
  folders: Folder[];
  setEditMode: (payload: boolean) => void;
  setFolders: (payload: Folder[]) => void;
  setCurrFolderId: (payload: number) => void;
  getFolders: () => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  createFolder: (url: string) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
}

export const repoStore = (): RepoStore => {
  const store: RepoStore = {
    currFolderId: -1,
    isEditMode: false,
    folders: [],
    setEditMode (isEditMode: boolean) {
      this.isEditMode = isEditMode
    },
    setFolders (folders: Folder[]) {
      this.folders = folders
    },
    setCurrFolderId (folderId: number) {
      this.currFolderId = folderId
    },
    async createFolder (folderName: string) {
      return new Promise((resolve, reject) => {
        client.mutate({
          mutation: CREATE_FOLDER,
          variables: { folderName }
        }).then((result) => {
          return resolve(result)
        }).catch((error) => {
          return reject(error)
        })
      })
    },
    async getFolders () {
      return new Promise((resolve, reject) => {
        client.query({
          query: GET_FOLDERS
        }).then((result) => {
          this.setFolders(result.data.findManyFolder)
          return resolve(result)
        }).catch((error) => {
          return reject(error)
        })
      })
    }
  }
  return store
}
