import React from 'react'
import styled from 'styled-components'
import Button from '@/components/Button'
import Pill from '@/components/Pill'
import { User } from '@/types/user'

const SolGitProfileWrapper = styled.div`
width: 66.7vw;
display: flex;
justify-content: center;
position: relative;
button {
position: absolute;
right: 0;
bottom: 0;
}
`

const SolGitProfile = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
> div {
&:not(:last-child) {
margin-top: 0.8rem;
}
}
.profile {
&__name {
font-size: 2.4rem;
font-weight: bold;
}
&__position {
font-size: 1.6rem;
color: #7C7C7C;
font-weight: bold;
}
&__follower {
font-size: 1.8rem;
&__label {
color: ${props => props.theme.primary};
margin-right: 1.6rem;
}
}
&__tags {
margin-top: 1.6rem;
.pill {
&:not(:last-child) {
margin-right: 1rem;
}
}
}
}
`

const EmptyProfileImage = styled.div`
border-radius: 100%;
background-color: ${props => props.theme.grayL};
min-width: 9.2rem;
min-height: 9.2rem;
img {
border-radius: 100%;
}
`

type ProfileProps = {
  user: User;
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {

  const editProfile = () => {
    console.log('edit profile')
  }

  return (
    <SolGitProfileWrapper>
      <SolGitProfile className="profile">
        <EmptyProfileImage>{props.user.profileUrl ?
          <img src={props.user.profileUrl} alt="profile"></img> : ''}</EmptyProfileImage>
        <div className="profile__name">{props.user.name}</div>
        <div className="profile__position">{`${props.user.work} ${props.user.company? `@ ${props.user.company}` : ''}`}</div>
        {/*<div className="profile__follower">*/}
        {/*  <span className="profile__follower__label">팔로워</span>*/}
        {/*  <span className="profile__follower__count">{`${props.user.follows.length}명`}</span>*/}
        {/*</div>*/}
        {/*<div className="profile__tags">*/}
        {/*  {props.user.tags.map((tag, tagIndex) => <Pill key={tagIndex}>{`#${tag.tag}`}</Pill>)}*/}
        {/*</div>*/}
      </SolGitProfile>
      {/* 1차 개발범위 초과<Button outline={true} onClick={editProfile}>프로필 수정하기</Button>*/}
    </SolGitProfileWrapper>
  )
}

export default Profile
