import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useObserver } from 'mobx-react-lite'
import { storeContext } from '@/stores/context'
import Button from '@/components/Button'
import styled from 'styled-components'

const SolGitHeader = styled.div`
width: 100vw;
height: 6.4rem;
display: flex;
justify-content: center;
position: fixed;
background-color: white;
top: 0;
z-index: ${props => props.theme.zIndexHeader};
.header__wrapper {
height: 100%;
align-items: center;
display: flex;
justify-content: space-between;
width: 66.7vw;
.brand {
  cursor: pointer;
  color: ${props => props.theme.secondary};
  font-weight: bold;
  font-size: 2.4rem;
  z-index: ${props => props.theme.zIndexHeader};
}
.navbar {
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: bold;
      & > div {
        cursor: pointer;
        &.curr-menu {
          color: ${props => props.theme.secondary};
        }
        &:not(:last-child) {
          margin-right: 3.2rem;
        }
      }
  }
  button {
   z-index: ${props => props.theme.zIndexHeader};
  }
}
`

type HeaderProps = {
  openLoginModal?: Dispatch<SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const store = React.useContext(storeContext)
  if (!store) throw Error('store shouldn\'t be null')

  return useObserver(() => {
    const history = useHistory()

    const [currMenu, setCurrMenu] = useState('')

    useEffect(() => {
      if (store.user.user && history.location.pathname === `/repo/${store.user.user.id}`) {
        setCurrMenu('myRepo')
      } else {
        setCurrMenu('feed')
      }
    })

    const handleLogin = () => {
      return props.openLoginModal ? props.openLoginModal(true) : null
    }

    const handleLogOut = () => {
      store.user.logout()
    }

    const goToMain = () => {
      history.push('/')
    }

    const goToMyRepo = () => {
      if (store.user.user) history.push(`/repo/${store.user.user.id}`)
    }

    return (
      <SolGitHeader>
        <div className="header__wrapper">
          <div onClick={goToMain} className="brand">솔깃 Sol-git</div>
          <div className="navbar">
            <div
              onClick={goToMain}
              className={currMenu === 'feed' ? 'curr-menu' : ''}
            >홈피드</div>
            <div
              onClick={goToMyRepo}
              className={currMenu === 'myRepo' ? 'curr-menu' : ''}
            >나만의 저장소</div>
          </div>
          {!store.user.user ? <Button onClick={handleLogin}>로그인</Button> : <Button onClick={handleLogOut}>로그아웃</Button>}
        </div>
      </SolGitHeader>
    )
  })
}

export default Header
