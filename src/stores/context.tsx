import React from 'react'
import { useLocalStore } from 'mobx-react-lite'
import { userStore, UserStore } from '@/stores/userStore'
import { contentStore, ContentStore } from '@/stores/contentStore'
import { repoStore, RepoStore } from '@/stores/repoStore'

type Store = {
  user: UserStore,
  content: ContentStore,
  repo: RepoStore
}

type StoreProviderProps = {
  children: React.ReactElement
}

export const storeContext = React.createContext<Store | null>(null)

export const StoreProvider = ({ children }: StoreProviderProps): JSX.Element => {
  const user = useLocalStore(userStore)
  const content = useLocalStore(contentStore)
  const repo = useLocalStore(repoStore)
  return (
    <storeContext.Provider value={{ user, content, repo }}>{children}</storeContext.Provider>
  )
}

export default StoreProvider

