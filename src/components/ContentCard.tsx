import React from 'react'
import styled from 'styled-components'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'
import checkCircle from '@/assets/check-circle.svg'
import checkCirclePurple from '@/assets/check-circle-purple.svg'
import { Folder } from '@/types/user'
import { ActionType, Content } from '@/types/content'
import Pill from '@/components/Pill'

type ContentCardProps = {
  isEditMode: boolean;
  isLogin: boolean
  isSelected: boolean;
  content: Content;
  handleCardClick?: () => void;
}

const SolGitContentCard = styled.div`
display: flex;
padding: 0.7rem 1.4rem;
&.edit-mode {
border: 1px solid ${props => props.theme.background};
border-radius: 3.2rem;
box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
cursor: pointer;
}

&.selected {
border: 2px solid ${props => props.theme.primary};
}

.card__checkbox-container {
width: 3.6rem;
img.check {
width: 3.2rem;
height: 3.2rem;
}
}
.card-wrapper {
	width: 100%;
	margin-left: 2rem;
}
.header-user {
	display: flex;
	justify-content: space-between;
	flex-flow: wrap;
	.user-profile {
	  display: flex;
	  .thumbnail {
	    margin-right: 2.5rem;
	  }
	}
}
.header-info {
	display: flex;
	justify-content: space-between;
	flex-flow: wrap;
	align-items: center;
}
.info-tags {
	margin: 1.2rem 0 1.2rem 0;
	> div {
		margin-right: 1rem;
	}
}
.info-like {
	display: flex;
	justify-content: space-between;
	align-item: center;
	> div {
		margin-left: 1.6rem;
		font-size: ${props => props.theme.fontSizeM};
	}
	> div:nth-child(3) {
		margin-left: 2.4rem;
	}
}
.card-profile {
	display: flex;
	align-items: center;
}
.profile-name {
	font-size: ${props => props.theme.fontSizeM};
	font-weight: ${props => props.theme.fontWeightB};
	margin-bottom: 0.4rem;
}
.profile-info {
	color: ${props => props.theme.gray};
	font-size: ${props => props.theme.fontSizeS};
}
.header-date {
	font-size: ${props => props.theme.fontSizeXs};
	margin: 0.5rem;
}
.card-body {
  cursor: pointer;
	background-color: white;
	padding: 2.4rem;
	border-radius: 0 3rem 3rem 3rem;
	display: flex;
	flex-direction: column;
}
.content-wrapper {
	display: flex;
	padding: 1.6rem;
	border: 1px solid #EFEFEF;
	border-radius: 2.4rem;
	max-width: 100%;
	flex-direction: column;
	& > div {
	display: flex;
	&:first-child {
	max-height: 8.2rem;
	overflow: hidden;
	}
	&:nth-child(2) {
	display: flex;
	justify-content: flex-end;
	}
	}
}

.content-thumbnail {
    margin-right: 1.6rem;
    min-width: 8.2rem;
    border-radius: ${props => props.theme.medium};
    background-color: ${props => props.theme.background};
}

.content-body {
	position: relative;
	flex-grow: 1;
  text-overflow: ellipsis;
}

.content-title {
	font-size: ${props => props.theme.fontSizeM};
	font-weight: bold;
}
.content-text {
	margin-top: 1rem;
	font-size: ${props => props.theme.fontSizeS};
}
.content-site {
	background-color: ${props => props.theme.grayL};
	border-radius: 2.4rem;
	font-size: 1.6rem;
	padding: 0.5rem 2.2rem;
}
.memo-wrapper {
	background-color: white;
	border-radius: 3rem;
	padding: 0 0 1rem 1rem;
}
.memo-title {
  font-weight: bold;
	font-size: ${props => props.theme.fontSizeM};
}
.memo-text {
	font-size: ${props => props.theme.fontSizeXs};
}
.memo-intro {
	text-align: center;
	> div {
		font-size: ${props => props.theme.fontSizeM};
	}
}
`

const svgThumbnail = <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M49.5334 45.8596C52.4077 42.4042 54.4068 38.3079 55.3616 33.9173C56.3164 29.5266 56.1987 24.9708 55.0187 20.6352C53.8386 16.2995 51.6308 12.3117 48.582 9.00891C45.5332 5.70616 41.7332 3.18568 37.5033 1.66071C33.2735 0.135728 28.7382 -0.348891 24.2813 0.247846C19.8243 0.844582 15.5768 2.50512 11.8979 5.08898C8.2191 7.67285 5.21722 11.104 3.14623 15.0923C1.07524 19.0805 -0.00392799 23.5084 1.0743e-05 28.0015C0.00152217 34.5332 2.30515 40.8557 6.50666 45.8596L6.46663 45.8936C6.60673 46.0616 6.76684 46.2056 6.91095 46.3716C7.09108 46.5776 7.28521 46.7715 7.47135 46.9715C8.03175 47.5795 8.60816 48.1634 9.21259 48.7113C9.39672 48.8793 9.58686 49.0353 9.77299 49.1953C10.4134 49.7472 11.0719 50.2712 11.7544 50.7591C11.8425 50.8191 11.9225 50.8971 12.0106 50.9591V50.9351C16.6981 54.2311 22.2901 56 28.022 56C33.7539 56 39.3459 54.2311 44.0335 50.9351V50.9591C44.1215 50.8971 44.1996 50.8191 44.2896 50.7591C44.9701 50.2692 45.6306 49.7472 46.2711 49.1953C46.4572 49.0353 46.6473 48.8773 46.8315 48.7113C47.4359 48.1614 48.0123 47.5795 48.5727 46.9715C48.7588 46.7715 48.951 46.5776 49.1331 46.3716C49.2752 46.2056 49.4373 46.0616 49.5774 45.8916L49.5334 45.8596ZM28.02 12.0032C29.8013 12.0032 31.5426 12.531 33.0237 13.5198C34.5048 14.5087 35.6592 15.9141 36.3409 17.5585C37.0226 19.2029 37.2009 21.0123 36.8534 22.7579C36.5059 24.5036 35.6481 26.107 34.3885 27.3656C33.129 28.6241 31.5242 29.4812 29.7771 29.8284C28.03 30.1756 26.2191 29.9974 24.5734 29.3163C22.9277 28.6352 21.5211 27.4818 20.5315 26.0019C19.5418 24.522 19.0136 22.7821 19.0136 21.0023C19.0136 18.6156 19.9625 16.3266 21.6515 14.639C23.3405 12.9513 25.6314 12.0032 28.02 12.0032ZM12.0226 45.8596C12.0573 43.2339 13.1253 40.7273 14.9954 38.8823C16.8656 37.0372 19.3876 36.002 22.0157 36.0007H34.0243C36.6525 36.002 39.1745 37.0372 41.0446 38.8823C42.9148 40.7273 43.9827 43.2339 44.0175 45.8596C39.628 49.8119 33.9288 51.9991 28.02 51.9991C22.1113 51.9991 16.4121 49.8119 12.0226 45.8596Z"
    fill="#7C7C7C"/>
</svg>

const svgLike = <svg width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M23.217 13.1334C23.721 12.4869 24 11.6948 24 10.8706C24 9.56299 23.247 8.32528 22.035 7.63507C21.723 7.45741 21.3677 7.3639 21.006 7.36423H13.812L13.992 3.78506C14.034 2.92011 13.719 2.09886 13.107 1.47272C12.8067 1.1641 12.4443 0.918552 12.0423 0.751249C11.6404 0.583946 11.2073 0.498442 10.77 0.500021C9.21 0.500021 7.83 1.51931 7.416 2.97836L4.839 12.0355H4.83V24.5H18.999C19.275 24.5 19.545 24.4476 19.794 24.3427C21.222 23.7515 22.143 22.3973 22.143 20.8946C22.143 20.5277 22.089 20.1665 21.981 19.8171C22.485 19.1706 22.764 18.3784 22.764 17.5542C22.764 17.1873 22.71 16.8262 22.602 16.4767C23.106 15.8302 23.385 15.0381 23.385 14.2139C23.379 13.8469 23.325 13.4829 23.217 13.1334ZM0 12.9674V23.5681C0 24.0835 0.429 24.5 0.96 24.5H2.91V12.0355H0.96C0.429 12.0355 0 12.452 0 12.9674Z"
    fill="#C4C4C4"/>
</svg>

const svgSave = <svg width="30" height="24" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M28.8 4.68537H15.3375L10.9388 0.580488C10.8828 0.52937 10.8092 0.500641 10.7325 0.5H1.2C0.53625 0.5 0 1.02317 0 1.67073V23.3293C0 23.9768 0.53625 24.5 1.2 24.5H28.8C29.4638 24.5 30 23.9768 30 23.3293V5.8561C30 5.20854 29.4638 4.68537 28.8 4.68537ZM19.5 14.878C19.5 15.0171 19.3725 15.1341 19.2188 15.1341H16.05V18.2402C16.05 18.3829 15.93 18.5 15.7875 18.5H14.2125C14.07 18.5 13.95 18.3829 13.95 18.2402V15.1341H10.7812C10.6275 15.1341 10.5 15.0171 10.5 14.878V13.3415C10.5 13.2024 10.6275 13.0854 10.7812 13.0854H13.95V9.97927C13.95 9.83659 14.07 9.71951 14.2125 9.71951H15.7875C15.93 9.71951 16.05 9.83659 16.05 9.97927V13.0854H19.2188C19.3725 13.0854 19.5 13.2024 19.5 13.3415V14.878Z"
    fill="#C4C4C4"/>
</svg>

const ContentCard = (props: ContentCardProps): JSX.Element => {

  const store = React.useContext(storeContext)
  if (!store) throw Error('store shouldn\'t be null')

  const cardClass = `${props.isEditMode ? 'edit-mode' : ''} ${props.isSelected ? 'selected' : ''}`

  return useObserver(() => {
    const handleCardClick = () => {
      if (props.handleCardClick) props.handleCardClick()
    }

    const handleContentClick = async (clipId: number, url: string) => {
      const result = await store.repo.getFolders()
      // TODO
      await store.content.createAction(ActionType.READ, clipId)
      store.content.sendUrlToBackground(
        clipId,
        url,
        result.data.findManyFolder.map((folder: Folder) => {
          return {
            id: folder.id,
            folderName: folder.folderName
          }
        }))
      window.open(url, '_blank')
    }

    return (
      <SolGitContentCard className={cardClass} onClick={handleCardClick}>
        <div className="card__checkbox-container">
          {props.isEditMode ? <img
            src={props.isSelected ? checkCirclePurple : checkCircle}
            className="check"
          /> : null}
        </div>
        <div className='card-wrapper'>
          <div className='card-header'>
            <div className='header-user'>
              <div className='user-profile'>
                <div className="thumbnail">{svgThumbnail}</div>
                <div>
                  <div className='profile-name'>이민경님의 메모</div>
                  <div className='profile-info'>프론트엔드 개발자@솔깃컴퍼니</div>
                </div>
              </div>
              <div className='header-date'>2021.05.13 저장</div>
            </div>

            <div className='header-info'>
              <div className='info-tags'>
                {/*{props.tags.map((tag, idx) => <Pill key={idx}>{tag}</Pill>)}*/}
                {['HTML', 'CSS', 'JS'].map((tag, idx) => <Pill key={idx}>{tag}</Pill>)}
              </div>
              <div className='info-like'>
                <div>{svgLike}</div>
                <div>{10}명</div>
                <div>{svgSave}</div>
                <div>{13}명</div>
              </div>
            </div>

          </div>
          <div className='card-body' onClick={() => {
            handleContentClick(props.content.id, props.content.url)
          }}>
            <div className='memo-wrapper'>
              {props.isLogin ?
                (<div>
                  <div className='memo-title'>노트:</div>
                  <div className='memo-text'>{props.content.memo ? props.content.memo : ''}</div>
                </div>)
                : (<div className='memo-intro'>
                  <div>자료 활용 팁과 메모</div>
                  <div>솔깃에 가입하고 확인하세요!</div>
                </div>)}
            </div>
            <div className='content-wrapper'>
              <div>
                <div className="content-thumbnail"></div>
                <div className='content-body'>
                  {/*<div className='content-title'>{props.content.memo} 자료</div>*/}
                  {/*<div className='content-text'>{props.contentText}</div>*/}
                  <div className='content-title'>Comparing the New Generation of Build Tools</div>
                  <div className='content-text'>In part, I think these tools are arriving as a reaction to JavaScript
                    tooling fatigue — something captured nicely in this article about learning JavaScript back in 2016.
                  </div>
                </div>
              </div>
              <div>
                <div className='content-site'>{props.content.url.split('/')[2]}</div>
              </div>
            </div>
          </div>
        </div>
      </SolGitContentCard>
    )
  })
}

export default ContentCard
