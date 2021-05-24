import React, { useState } from 'react'
import Header from '@/components/Header'
import HeaderContent from '@/components/HeaderContent'
import Modal from '@/components/Modal'
import Login from '@/components/Login'
import styled from 'styled-components'
import { storeContext } from '@/stores/context'
import { useObserver } from 'mobx-react-lite'
import OnbBoarding from '@/components/OnBoarding'

const SolGitMain = styled.div`
.login {
.modal__content {
padding: 3.8rem 0 9.4rem;
}
}
`

const MainHeader: React.FC = () => {

  const store = React.useContext(storeContext)
  // TODO: 스토어 없을시 에러메세지 변수화
  if (!store) throw Error('store shouldn\'t be null')
  return useObserver(() => {
    const [isOpenLoginModal, openLoginModal] = useState(false)
    const [isOpenOnboardingModal, openOnboardingModal] = useState(false)
    return (
      <SolGitMain>
        <Modal className="login" open={openLoginModal} isOpen={isOpenLoginModal}>
          <Login
            openOnboardingModal={openOnboardingModal}
            openLoginModal={openLoginModal}
          />
        </Modal>
        <Modal open={openOnboardingModal} isOpen={isOpenOnboardingModal}>
          <OnbBoarding
            openOnboardingModal={openOnboardingModal}
          />
        </Modal>
        <Header
          openLoginModal={openLoginModal}
        />
        <HeaderContent/>
      </SolGitMain>
    )
  })
}

export default MainHeader
