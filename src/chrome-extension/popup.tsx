import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import Dropdown from '@/components/Dropdown'
import Button from '@/components/Button'
import { CreateClipPayload, MessageMethodTypes } from '@/types/content'
import styled from 'styled-components'
import Checkbox from '@/components/Checkbox'
import saveWhite from '@/assets/save-white.svg'
import '@/scss/app.scss'
import { Folder } from '@/types/user'

// eslint-disable-next-line
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../scss/app.scss')

const SolGitPopup = styled.div`
width: 43.2rem;
font-size: 1.6rem;

button.button {
border: none;
min-width: 12rem;
padding: 0;
height: 4rem;
display: flex;
align-items: center;
justify-content: center;
&:hover {
background-color: ${props => props.theme.primary};
}
img {
width: 2.2rem;
height: 1.8rem;
margin-right: 0.8rem;
}
}

&.popup {
& > div {
display: flex;
&:not(:nth-child(2)) {
background-color: #F8F8F8; // ${props => props.theme.$grayL};
}
}
&.popup__header {
flex-direction: column;
padding: 1.2rem 1.6rem;
.title {
white-space: nowrap;
text-overflow: ellipsis;
max-width: 100%;
overflow: hidden;
font-weight: bold;
margin-bottom: 0.4rem;
}
input {
background-color: transparent;
border: none;
font-size: 1.6rem;
}
}
&.popup__body {
background-color:${props => props.theme.$grayL};
textarea {
flex-grow: 1;
padding: 0.8rem 1.6rem;
resize: none;
border: none;
&::-webkit-input-placeholder {
font-size: 1.8rem;
color: ${props => props.theme.$primary};
}

&:-moz-placeholder { /* Firefox 18- */
font-size: 1.8rem;
color: ${props => props.theme.$primary};
}

&::-moz-placeholder {  /* Firefox 19+ */
font-size: 1.8rem;
color: ${props => props.theme.$primary};
}

&:-ms-input-placeholder {
font-size: 1.8rem;
color: ${props => props.theme.$primary};
}
}
}
&.popup__footer {
flex-direction: column;
padding: 1.1rem 4.5rem 1.8rem;
.popup__footer {
&__folder, &__save {
display: flex;
align-items: center;
justify-content: space-between;
}
&__folder {
display: flex;
align-items: center;
margin-bottom: 0.8rem;
.label {
margin-right: 1.4rem;
}
.dropdown {
flex-grow: 1;
font-size: 1.4rem;
&__button {
min-height: 1.8rem;
}
}
}
&__save {
.checkbox__wrapper {
display: flex;
align-items: center;
.label {
margin-right: 0.8rem;
}
.checkbox__container {
margin-bottom: 0;
}
}
}
}
}
}
`

const Popup: React.FC = () => {
  const [currTabUrl, setCurrTabUrl] = useState('')
  const [currTabTitle, setCurrTabTitle] = useState('')
  const [folders, setFolders] = useState([] as Folder[])
  const [tempPayload, setTempPayload] = useState({
    folderId: -1,
    isPrivate: true,
    url: '',
    memo: ''
  } as CreateClipPayload)

  const setUrl = () => {
    chrome.tabs.query({
      highlighted: true
    }, function (tabs) {
      const tab = tabs[0]
      if (tab.title) setCurrTabTitle(tab.title)
      if (tab.url) {
        setCurrTabUrl(tab.url)
        setTempPayload({ ...tempPayload, url: tab.url })
      }
    })
  }

  const getFolders = () => {
    try {
      chrome.runtime.sendMessage({
        method: MessageMethodTypes.GET_FOLDERS
      }, (res) => {
        if (res.data) setFolders(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  // TODO: store로 메소드 이동
  useEffect(() => {
    setUrl()
    getFolders()
  }, [])

  const selectFolder = (index: number) => {
    setTempPayload({ ...tempPayload, folderId: folders[index].id })
  }

  const handleCheckboxToggle = () => {
    setTempPayload(({ ...tempPayload, isPrivate: !tempPayload.isPrivate }))
  }

  const handleMemoInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTempPayload(({ ...tempPayload, memo: event.target.value }))
  }

  const handleSaveButtonClick = async () => {
    await chrome.runtime.sendMessage({
      method: MessageMethodTypes.POST_CONTENT_SAVE,
      payload: tempPayload
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <SolGitPopup className="popup">
        <div className="popup__header">
          <div className="title">{currTabTitle || '제목'}</div>
          <input
            value={currTabUrl || 'url'}
            spellCheck={false}
          />
        </div>
        <div className="popup__body">
          <textarea
            spellCheck={false}
            placeholder={'메모하기'}
            rows={4}
            onChange={handleMemoInput}
          />
        </div>
        <div className="popup__footer">
          <div className="popup__footer__folder">
            <div className="label">폴더</div>
            <Dropdown
              buttonText={!folders.length ? '폴더가 없습니다' : ''}
              list={folders.length ? folders.map(folder => folder.folderName) : []}
              handleItemSelect={selectFolder}
            />
          </div>
          <div className="popup__footer__save">
            <div className="checkbox__wrapper">
              <div className="label">솔깃에 공유하기</div>
              <Checkbox
                isChecked={!tempPayload.isPrivate}
                toggleCheckbox={handleCheckboxToggle}
              />
            </div>
            <Button onClick={handleSaveButtonClick}>
              <img src={saveWhite}/>
              <div>저장</div>
            </Button>
          </div>
        </div>
      </SolGitPopup>
    </ThemeProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup/>
  </React.StrictMode>,
  document.getElementById('root')
)
