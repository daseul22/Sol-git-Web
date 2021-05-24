import React, { useState, Dispatch, SetStateAction } from 'react'
import { useObserver } from 'mobx-react-lite'
import { storeContext } from '@/stores/context'
import OnBoardingOriginJob from '@/components/OnBoardingOriginJob'
import OnBoardingInterestJob from '@/components/OnBoardingInterestJob'
import OnBoardingTags from '@/components/OnBoardingTags'
import OnBoardingManual from '@/components/OnBoardingManual'
import styled from 'styled-components'
import OnBoardingPosition from '@/components/OnBoardingPosition'

const SolGitOnBoarding = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 96rem;
height: 54.4rem;
`

type OnBoardingProps = {
  openOnboardingModal: Dispatch<SetStateAction<boolean>>
}

const OnbBoarding: React.FC<OnBoardingProps> = (props: OnBoardingProps) => {
  const store = React.useContext(storeContext)
  if (!store) throw Error('store shouldn\'t be null')

  return useObserver(() => {
    const [step, toNextStep] = useState(0)

    return (<SolGitOnBoarding>
      {step === 0 ? (
          <OnBoardingManual
            toNextStep={() => toNextStep(step + 1)}
          />)
        : step === 1 ? (
          <OnBoardingOriginJob
            toNextStep={() => toNextStep(step + 1)}
            setOnboardingInfo={store.user.setOnboardingInfo}
          />)
        : step === 2 ? (
          <OnBoardingInterestJob
            toNextStep={() => toNextStep(step + 1)}
            setOnboardingInfo={store.user.setOnboardingInfo}
          />
        ) : step === 3 ? (
          <OnBoardingTags
            getTags={store.user.getTags}
            toNextStep={() => toNextStep(step + 1)}
            setOnboardingInfo={store.user.setOnboardingInfo}
          />
        ) : step === 4 ? (
          <OnBoardingPosition
            register={store.user.register}
            setOnboardingInfo={store.user.setOnboardingInfo}
            openOnboardingModal={props.openOnboardingModal}
        />) : null}
    </SolGitOnBoarding>)
  })
}

export default OnbBoarding
