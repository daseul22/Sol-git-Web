import React, { useEffect } from 'react'
import { useObserver } from 'mobx-react-lite'
import { storeContext } from '@/stores/context'
import styled from 'styled-components'
import Intro from '@/components/Intro'
import Profile from '@/components/Profile'

const SolGitHeaderContent = styled.div`
display: flex;
width: 100vw;
height: 33.2rem;
justify-content: center;
align-items: center;
box-shadow: 0px 4px 4px -2px rgba(0, 0, 0, 0.25);
`
const HeaderContent: React.FC = () => {
  const store = React.useContext(storeContext)
  if (!store) throw Error('store shouldn\'t be null')
  return useObserver(() => {

    useEffect(() => {
      //   // TODO: cookie.getCookie 메소드로 대체
      if (document.cookie) {
        const getUser = async () => {
          try {
            await store.user.getUser()
          } catch (error) {
            console.log(error)
          }
        }
        getUser()
      }
    }, [])

    return (
      <SolGitHeaderContent>
        { store.user.user ? <Profile user={store.user.user}/> : <Intro/> }
      </SolGitHeaderContent>
    )
  })
}

export default HeaderContent
