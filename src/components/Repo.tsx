import React, { useEffect, useState } from 'react'
import { useObserver } from 'mobx-react-lite'
import styled from 'styled-components'
import ContentCard from '@/components/ContentCard'
import SideBar from '@/components/SideBar'
import { storeContext } from '@/stores/context'
import Button from '@/components/Button'
import { Folder } from '@/types/user'

const SolGitRepo = styled.div`
flex-grow: 1;
height: 100%;
background-color: ${props => props.theme.backgroundL};
display: flex;
justify-content: center;
  .sidebar__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .buttons {
    width: 100%;
    button {
      width: 100%;
      margin-top: 3.6rem;
      height: 5.4rem;
      letter-spacing: -0.02rem;
    }
  > div {
    margin-top: 1.3rem;
    position: relative;
    > span {
      position: absolute;
      top: 35%;
      left: 3%;
    }
    > input {
      display: inline-block;
      letter-spacing: -0.02rem;
      width: 15rem;
      height: 5.4rem;
      background-color: white;
      color: ${props => props.theme.primary};
      border: 1px solid ${props => props.theme.primary};
      font-size: 1.8rem;
      border-radius: ${props => props.theme.medium};
      padding-left: 2.2rem;
      &:hover {
        border: 2px solid ${props => props.theme.primary};
      }
    }
  }
}
  }
.feed-wrapper {
	width: 73.9rem;
  margin: 2.4rem;
}
.user-intro {
  background-color: white;
  border: 1px solid ${props => props.theme.background};
  border-radius: 2rem;
  padding: 1rem;
  font-size: 1.8rem;
  font-weight: bold;
  height: 13.1rem;
  margin-bottom: 6rem;
}
.feed-header {
	display: flex;
	justify-content: space-between;
	flex-flow: wrap;
	align-items: top;
  margin-bottom: 2.1rem;
	> div {
		font-size: ${props => props.theme.fontSizeL};
		font-weight: ${props => props.theme.fontWeightB};
	}
}
.feed-body > div {
  margin-bottom: 4rem;
}
`

const svg = <svg width="15" height="15" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M24.0875 22.5481L19.4631 17.8558C20.9551 15.9213 21.7647 13.5325 21.7617 11.0734C21.7617 8.88326 21.1235 6.74234 19.9279 4.92133C18.7323 3.10033 17.033 1.68103 15.0448 0.842914C13.0566 0.00479789 10.8688 -0.214491 8.75811 0.212776C6.64743 0.640044 4.70864 1.69468 3.18693 3.24332C1.66522 4.79195 0.628917 6.76504 0.209077 8.91306C-0.210763 11.0611 0.00471448 13.2876 0.82826 15.3109C1.65181 17.3343 3.04643 19.0638 4.83578 20.2805C6.62512 21.4973 8.72882 22.1467 10.8809 22.1467C13.2973 22.1498 15.6446 21.3259 17.5454 19.8075L22.1561 24.5136C22.2826 24.6434 22.433 24.7464 22.5987 24.8166C22.7645 24.8869 22.9423 24.9231 23.1218 24.9231C23.3014 24.9231 23.4791 24.8869 23.6449 24.8166C23.8106 24.7464 23.961 24.6434 24.0875 24.5136C24.215 24.385 24.3161 24.2319 24.3852 24.0632C24.4542 23.8945 24.4898 23.7136 24.4898 23.5309C24.4898 23.3482 24.4542 23.1672 24.3852 22.9986C24.3161 22.8299 24.215 22.6768 24.0875 22.5481ZM2.72022 11.0734C2.72022 9.43078 3.19883 7.82509 4.09553 6.45934C4.99223 5.09359 6.26675 4.02911 7.75791 3.40053C9.24907 2.77194 10.8899 2.60747 12.4729 2.92792C14.0559 3.24837 15.51 4.03935 16.6513 5.20083C17.7926 6.3623 18.5698 7.84212 18.8847 9.45313C19.1996 11.0641 19.038 12.734 18.4203 14.2516C17.8026 15.7691 16.7567 17.0662 15.4147 17.9787C14.0726 18.8913 12.4949 19.3784 10.8809 19.3784C8.71652 19.3784 6.64083 18.5034 5.11041 16.9459C3.58 15.3884 2.72022 13.276 2.72022 11.0734Z"
    fill="#756CED"/>
</svg>

const Repo: React.FC = () => {
  const store = React.useContext(storeContext)
  if (!store) throw Error('store shouldn\'t be null')
  return useObserver(() => {

    useEffect(() => {
      const getFolders = async () => {
        try {
          const { data } = await store.repo.getFolders()
          store.repo.setCurrFolderId((data.findManyFolder as Folder[])[0].id)
          console.log(store.repo.currFolderId)
        } catch (error) {
          console.log(error)
        }
      }
      getFolders()
    }, [])

    useEffect(() => {
      const getFolderContents = async () => {
        try {
          console.log(`currFolderId: ${store.repo.currFolderId}`)
          const folderContents = await store.content.getUserContents(store.repo.currFolderId)
          console.log('god folder contents')
          console.log(folderContents)
        } catch (error) {
          console.log(error)
        }
      }
      getFolderContents()
    }, [store.repo.currFolderId])

    const handleEditButtonClick = () => {
      store.repo.setEditMode(!store.repo.isEditMode)
    }

    const [selectedCards, selectCard] = useState([] as number[])

    const handleCardClick = (cardIndex: number) => {
      if (!selectedCards.includes(cardIndex)) {
        selectCard([...selectedCards, cardIndex])
      } else {
        selectCard(selectedCards.filter(c => c !== cardIndex))
      }
    }

    // TODO: 유저 본인의 레포일때만 폴더 관리 버튼 표출



    return <SolGitRepo className="repo">
      <div className="sidebar__wrapper">
        <SideBar/>
        <div className='buttons'>
          <Button
            outline={true}
            onClick={handleEditButtonClick}
          >
            {store.repo.isEditMode ? '폴더 관리 완료' : '폴더 관리'}
          </Button>
          {/*<div>* 1차 기획 범위 초과/}
        {/*  <span>{svg}</span>*/}
          {/*  <input type='search' placeholder='저장소 내 검색'/>*/}
          {/*</div>*/}
        </div>
      </div>
      <div className='feed-wrapper'>
        {/* 1차 기획범위 초과 <div className='user-intro'>자기 소개</div>*/}
        <div className='feed-header'>
          <div>{store.user.user?.name}님의 실시간 저장 타임라인</div>
        </div>
        <div className='feed-body'>
          {store.content.currFolderContents.map((content, contentIndex) =>
            <ContentCard
              isEditMode={store.repo.isEditMode}
              isSelected={store.repo.isEditMode && selectedCards.includes(contentIndex)}
              key={contentIndex}
              isLogin={!!store.user.user}
              content={content}
              handleCardClick={() => {
                handleCardClick(contentIndex)
              }}
            />)} 
            {/*  feeds.map((feed, idx) =>
             <ContentCard
               isEditMode={false}
               isSelected={false}
               key={idx}
               isLogin={!!store.user.user}
               content={feed}
             />) */}
            
        </div>
      </div>
    </SolGitRepo>
  })
}

export default Repo
