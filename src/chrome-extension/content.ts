import './content.scss'
import like from '../assets/like.png'
import arrowDown from '../assets/arrow-down.png'
import { ContentFeedback, MessageMethodTypes } from '@/types/content'
import { Folder } from '@/types/user'

let folders = [] as Folder[]

const getFolders = () => {
  chrome.runtime.sendMessage({ method: MessageMethodTypes.GET_FOLDERS }, (res) => {
    folders = res.data
  })
}

getFolders()

const contentFeedbackForm: ContentFeedback = {
  clipId: -1,
  isUseful: false,
  isSave: false,
  folderId: -1
}

let selectedFolderId = -1

const showFeedbackPopup = async () => {
  const body = document.getElementsByTagName('body')

  const reviewContainer = document.createElement('div')
  reviewContainer.className = 'review__container'

  const usefulDiv = document.createElement('div')
  usefulDiv.className = 'review__is-useful'
  usefulDiv.innerHTML = `해당 콘텐츠가\n도움이 되었나요?`

  const buttonContainer = document.createElement('div')
  buttonContainer.className = 'button__container'

  const usefulButton = document.createElement('div')
  usefulButton.className = 'button button-like'
  const likeIcon = document.createElement('img')
  likeIcon.src = like
  likeIcon.className = 'icon--like'
  usefulButton.append(likeIcon)
  const usefulText = document.createElement('div')
  usefulText.innerHTML = '유용해요'
  usefulButton.append(usefulText)
  usefulButton.addEventListener('click', () => {
    contentFeedbackForm.isUseful = true
  })

  const dropdownWrapper = document.createElement('div')
  dropdownWrapper.className = 'dropdown__wrapper'

  const saveButton = document.createElement('div')
  saveButton.className = 'button button--save'
  if (!folders || !folders.length) saveButton.className = `${saveButton.className} empty`
  const arrowDownIcon = document.createElement('img')
  arrowDownIcon.src = arrowDown
  arrowDownIcon.className = 'icon--save'
  const saveText = document.createElement('div')
  saveText.innerHTML = folders && folders.length ? '내 폴더에 저장' : '폴더가 없습니다'
  saveButton.append(saveText)
  saveButton.append(arrowDownIcon)
  saveButton.addEventListener('click', () => {
    if (folders && folders.length) {
      const isShowDropdownItems = !dropdownItems.className.includes('hide')
      dropdownItems.className = isShowDropdownItems ? 'hide' : ''
    }
  })

  const dropdownItems = document.createElement('ul')
  dropdownItems.className = 'hide'
  if (folders) {
    folders.forEach((folder, idx) => {
      const dropdownItem = document.createElement('li')
      dropdownItem.innerHTML = folder.folderName
      dropdownItem.addEventListener('click', () => {
        dropdownItems.className = 'hide'
        saveText.innerHTML = folder.folderName
        selectedFolderId = folder.id
        contentFeedbackForm.isSave = true
        contentFeedbackForm.folderId = folder.id
        if (dropdownItem.innerText === saveText.innerHTML) dropdownItem.className = 'selected'
        else dropdownItem.className = ''
      })
      dropdownItems.appendChild(dropdownItem)
    })
  }
  dropdownWrapper.appendChild(saveButton)
  dropdownWrapper.appendChild(dropdownItems)

  const enterButton = document.createElement('div')
  enterButton.innerHTML = 'Enter'
  enterButton.className = 'enter-button'
  enterButton.addEventListener('click', () => {
    handleSaveButtonClick()
    reviewContainer.className = `${reviewContainer.className} hide`
  })

  reviewContainer.appendChild(usefulDiv)

  buttonContainer.appendChild(usefulButton)

  buttonContainer.appendChild(dropdownWrapper)

  buttonContainer.appendChild(enterButton)

  reviewContainer.appendChild(buttonContainer)

  body[0]?.prepend(reviewContainer)
}

const currTabUrl = document.location.href

chrome.runtime.sendMessage({ method: MessageMethodTypes.GET_CONTENT_CARD_URL }, async (res) => {
  if (res && res.data.url === currTabUrl) {
    await showFeedbackPopup()
    contentFeedbackForm.clipId = res.data.clipId
  }
})

const handleSaveButtonClick = () => {
  chrome.runtime.sendMessage({
    method: MessageMethodTypes.POST_CONTENT_FEEDBACK,
    payload: contentFeedbackForm
  })
}
