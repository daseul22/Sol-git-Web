import React from 'react'
import styled from 'styled-components'
import Header from '@/components/Header'
import HeaderContent from '@/components/HeaderContent'

type MainLayoutProps = {
  children: JSX.Element;
}

const SolGitMainLayout = styled.div`
min-height: 100vh;
min-width: 100vw;
display: flex;
flex-direction: column;
.content {
  display: flex;
  flex-grow: 1;
}
`

const MainLayout = (props: MainLayoutProps): JSX.Element => {
  return (
    <SolGitMainLayout>
      <Header/>
      <HeaderContent/>
      <div className="content">
        {props.children}
      </div>
    </SolGitMainLayout>
  )
}

export default MainLayout
