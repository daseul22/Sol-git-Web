import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { storeContext } from '@/stores/context'
import Tag from '@/components/Tag'
import FolderList from '@/components/Folder'
import Category from '@/components/Category'
import plusGray from '@/assets/plus-gray.svg'
import { useObserver } from 'mobx-react-lite'

const SolGitSideBar = styled.div`
display: flex;
flex-direction: column;
padding-top: 2.4rem;
//max-height: 100%;
`

const SolGitAddFolder = styled.div`
border: 1px solid ${props => props.theme.background};
border-radius: 8px;
display: flex;
justify-content: center;
align-items: center;
height: 4rem;
.plus-button__container {
flex-grow: 1;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
border-radius: 8px;
}
input {
background-color: transparent;
height: 100%;
border: none;
}
`

const SideBar = (): JSX.Element => {
  const store = React.useContext(storeContext)
  if (!store) throw Error('store shouldn\'t be null')

  return useObserver(() => {

    const tags = ['JavaScript', 'Python', 'SQL', 'React']
    const categories = ['개발', '기획', '디자인', '마케팅']

    const [currMenu, setCurrMenu] = useState('')
    const [isFolderAddMode, setFolderAddMode] = useState(false)

    const history = useHistory()
    const folderInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (folderInput.current) folderInput.current.focus()
    }, [isFolderAddMode])

    useEffect(() => {
      if (store.user.user && history.location.pathname === `/repo/${store.user.user.id}`) {
        setCurrMenu('myRepo')
      } else {
        setCurrMenu('feed')
      }
    })

    const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
      if (event.target.value) await store.repo.createFolder(event.target.value)
      await store.repo.getFolders()
      setFolderAddMode(false)
    }

    return (
      <SolGitSideBar className="sidebar">
      <Tag tags={tags}/>
      {currMenu === 'myRepo' ? (
        <div>
          <FolderList
            folders={store.repo.folders}
            currFolderId={store.repo.currFolderId}
          />
          <SolGitAddFolder>
            {!isFolderAddMode ?
              <button
                className="plus-button__container"
                onClick={() => {
                  setFolderAddMode(true)
                }}
              ><img src={plusGray}/></button>
              : <input
                ref={folderInput}
                spellCheck={false}
                onBlur={(event) => {
                  handleBlur(event)
                }}
              />}
          </SolGitAddFolder>
        </div>
      ) : <Category categories={categories}/>}
    </SolGitSideBar>)
  })
}
export default SideBar
