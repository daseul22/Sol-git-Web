import React from 'react'
import styled from 'styled-components'
import { OnboardingStepProps } from '@/types/user'

const SolGitOnBoardingInterestJob = styled.div`
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
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.background};
    color: white;
  }
}
}
`

const OnBoardingInterestJob: React.FC<OnboardingStepProps> = (props: OnboardingStepProps) => {
  const interestJobs: string[] = ['프론트엔드', '백엔드', '풀스택']

  const handleClick = (job: string) => {
    props.setOnboardingInfo({ interestJob: job })
    props.toNextStep()
  }

  return <SolGitOnBoardingInterestJob>
    <div className='header'>2단계 : 관심 직군</div>
    <div className='main-text'>해당 직군에서 어떤 직무에 관심이 있나요?</div>
    <div className='sub-text'>주로 많이 찾아보는 콘텐츠의 직무 분야를 골라주세요.</div>
    <div className='buttons'>
    {interestJobs.map((job, idx) =>
      <button key={idx} onClick={() => handleClick(job)}>{job}</button>)}
    </div>
  </SolGitOnBoardingInterestJob>
}

export default OnBoardingInterestJob
