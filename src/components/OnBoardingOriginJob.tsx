import React from 'react'
import styled from 'styled-components'
import { OnboardingStepProps } from '@/types/user'
import Button from '@/components/Button'

const SolGitOnBoardingOriginJob = styled.div`
display: flex;
flex-direction: column;
align-items: center;
.header {
  text-align: center;
  background-color: #EB45870F;
  font-size: 1.6rem;
}
.main-text {
  margin-top: 2.2rem;
  font-size: ${props => props.theme.fontSizeXl};
  font-weight: ${props => props.theme.fontWeightB};
}
.sub-text {
  margin-top: 0.8rem;
  margin-bottom: 2.9rem;
  font-size: ${props => props.theme.fontSizeM};
}
.buttons {
  display: flex;
  flex-direction: column;
  & > button {
    width: 19rem;
    padding: 0.9rem;
    border-radius: 1.6rem;
    border: 1px solid ${props => props.theme.background};
    background-color: ${props => props.theme.backgroundL};
    font-size: ${props => props.theme.fontSizeXl};
    font-weight: ${props => props.theme.fontWeightB};
    margin-bottom: 2rem;
    :nth-child(n+2) {
      color: white;
    }
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.background};
      color: white;
    }
  }
}
`

const OnBoardingOriginJob: React.FC<OnboardingStepProps> = (props: OnboardingStepProps) => {
  const originJobs: string[] = ['개발', '기획(준비 중)', '디자인(준비 중)', '마케팅(준비 중)']

  const handleClick = (job: string) => {
    props.setOnboardingInfo({ originJob: job })
    props.toNextStep()
  }

  return <SolGitOnBoardingOriginJob>
    <div className='header'>1단계 : 소속 직군</div>
    <div className='main-text'>어느 직군에서 일하고 있나요?</div>
    <div className='sub-text'>해당 직무에 종사하는 유저들의 추천 콘텐츠를 볼 수 있어요.</div>
    <div className='buttons'>
    {originJobs.map((job, idx) =>
      <button key={idx} onClick={() => handleClick(job)}>{job}</button>)}
    </div>
  </SolGitOnBoardingOriginJob>
}

export default OnBoardingOriginJob
