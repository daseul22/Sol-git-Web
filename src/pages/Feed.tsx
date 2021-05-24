import React from 'react'
import styled from 'styled-components'
import SideBar from '@/components/SideBar'
import ContentCard from '@/components/ContentCard'
import Dropdown from '@/components/Dropdown'
import { useObserver } from 'mobx-react-lite'
import { storeContext } from '@/stores/context'
import { Content } from '@/types/content'

const SolGitFeed = styled.div`
background-color: ${props => props.theme.backgroundL};
display: flex;
.feed-wrapper {
	width: 73.9rem;
  margin: 2.4rem;
}
.feed-header {
	display: flex;
	justify-content: space-between;
	flex-flow: wrap;
	align-items: top;
	> div {
		font-size: ${props => props.theme.fontSizeL};
		font-weight: ${props => props.theme.fontWeightB};
	}
}
.feed-body > div {
  margin-bottom: 4rem;
}
`

const Feed: React.FC = () => {
  const store = React.useContext(storeContext)
  if (!store) throw Error('store shouldn\'t be null')

  const feeds = [] as Content[]

  return (
    <SolGitFeed>
      <SideBar/>
      <div className='feed-wrapper'>
        <div className='feed-header'>
          {!!store.user.user ?
            <div>어떤 정보들이 공유되고 있을까요?</div>
            : <div>잠깐 솔깃한 정보들을 구경해보는 건 어떨까요?</div>}
          <Dropdown list={['최신순', '팔로워 순']}/>
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
}

export default Feed
