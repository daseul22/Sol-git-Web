import React from 'react'
import styled from 'styled-components'
import { Folder } from '@/types/user'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'

type FolderProps = {
  folders: Folder[];
  currFolderId: number;
}

const SolGitFolder = styled.div`
div {
  font-size: 2rem;
  font-weight: bold;
  margin: 3.2rem 0 1.6rem 0;
}
button {
  display: block;
  width: 16.6rem;
  height: 4rem;
  text-align: start;
  font-size: 1.8rem;
  border-radius: 0.8rem;
  padding: 0.8rem;
  margin: 0 0 0.3rem 0;
  &:hover, &.selected {
    background-color: rgba(117, 108, 237, 0.3);
    cursor: pointer;
  }
}
`

const FolderList = (props: FolderProps) => {
  const store = React.useContext(storeContext)
  if (!store) throw Error('store shouldn\'t be null')
  return useObserver(() => {

    const handleFolderClick = (folderId: number) => {
      store.repo.setCurrFolderId(folderId)
    }

    return (<SolGitFolder>
      <div>폴더 전체</div>
      {props.folders.map((folder, idx) =>
        <button
          key={idx}
          onClick={() => handleFolderClick(folder.id)}
          className={folder.id === props.currFolderId ? 'selected' : ''}
        >{folder.folderName}</button>
      )}
    </SolGitFolder>)
  })
}

export default FolderList
