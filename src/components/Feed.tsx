import React from 'react'
import { storeContext } from '@/stores/context'
import styled from 'styled-components'
import SideBar from '@/components/SideBar'
import ContentCard from '@/components/ContentCard'
import Dropdown from '@/components/Dropdown'
import { useObserver } from 'mobx-react-lite'

const SolGitFeed = styled.div`
  background-color: ${props => props.theme.backgroundL};
  display: flex;
  justify-content: center;
  position: relative;
  display: flex;
  align-items: flex-start;
  .sidebar {
    position: sticky;
    top: 6.4rem;
  }

.feed-header {
	display: flex;
	justify-content: space-between;
	flex-flow: wrap;
	align-items: top; // TODO: invalid value
	> div {
		font-size: ${props => props.theme.fontSizeL};
		font-weight: ${props => props.theme.fontWeightB};
	}
}
.feed-wrapper {
	width: 73.9rem;
  margin: 2.4rem;
}
.feed-body > div {
  margin-bottom: 4rem;
}
`

const MainContent: React.FC = () => {
  const store = React.useContext(storeContext)
  if (!store) throw Error('store shouldn\'t be null')

  return useObserver(() => {
    const feeds = [
      {
        id: 1,
        url: 'https://css-tricks.com/comparing-the-new-generation-of-build-tools/',
        memo: 'CSS + HTML / Basic',
        isUseful: true,
        isSave: true
      },
      {
        id: 1,
        url: 'https://uxplanet.org/new-to-ux-design-feeling-overwhelmed-40ea8e330ab1?source=collection_category---4------0-----------------------',
        memo: 'UX design',
        isUseful: true,
        isSave: true
      },
      {
        id: 1,
        url: 'https://uxplanet.org/design-career-how-to-get-a-design-job-you-dream-about-ef3676a36b7b?source=collection_category---4------0-----------------------',
        memo: 'Career',
        isUseful: true,
        isSave: true
      }
    ]

    const dropdownList = ['최신 순', '팔로워 순']

    return (
      <SolGitFeed className="feed">
        <SideBar/>
        <div className='feed-wrapper'>
          <div className='feed-header'>
            {store.user.user ?
              <div>어떤 정보들이 공유되고 있을까요?</div>
              : <div>잠깐 솔깃한 정보들을 구경해보는 건 어떨까요?</div>}
            <Dropdown list={dropdownList}></Dropdown>
          </div>
          <div className='feed-body'>
            {feeds.map((feed, idx) =>
              <ContentCard
                isEditMode={false}
                isSelected={false}
                key={idx}
                isLogin={!!store.user.user}
                content={feed}
              />)}
          </div>
        </div>
      </SolGitFeed>
    )
  })
}

export default MainContent
