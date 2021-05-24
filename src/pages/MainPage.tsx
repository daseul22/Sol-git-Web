import React from 'react'
import MainHeader from '@/components/MainHeader'
import Feed from '@/components/Feed'
import styled from 'styled-components'

const SolGitMainPage = styled.div`
min-height: 100vh;
min-width: 100vw;
display: flex;
flex-direction: column;
.feed {
flex-grow: 1;
}
`

//header 6.4

const MainPage: React.FC = () => (
  <SolGitMainPage>
    <MainHeader />
    <Feed />
  </SolGitMainPage>
)

export default MainPage
