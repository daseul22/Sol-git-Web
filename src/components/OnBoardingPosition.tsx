import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { FetchResult } from '@apollo/client'
import { useObserver } from 'mobx-react-lite'
import { storeContext } from '@/stores/context'

type OnBoardingPositionProps = {
  // TODO: type 정교화
  register: () => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>; // Promise<void>;
  openOnboardingModal: Dispatch<SetStateAction<boolean>>;
  setOnboardingInfo: (info: Record<string, string | number[]>) => void;
}

const SolGitOnBoardingPosition = styled.div`
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
  margin-bottom: 2.5rem;
  font-size: ${props => props.theme.fontSizeM};
}
.input-area {
  margin-top: 5.5rem;
  margin-bottom: 11.5rem;
  > input {
  background-color: #EFEFEF;
  border: 1px solid #C4C4C4;
  border-radius: 0.8rem;
  padding: 1.2rem;
  font-size: 1.8rem;
  color: #7C7C7C;
  text-align: center;
  }
  > span {
    font-size: 2.4rem;
    font-weight: bold;
    margin: 3.2rem;
  }
}
.submit-btn {
  width: 22.4rem;
  padding: 1.1rem;
  border-radius: 0.8rem;
  border: 1px solid ${props => props.theme.primary};
  background-color: ${props => props.theme.primary};
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.primaryL};
  }
}
.skip-btn {
  border: none;
  background-color: white;
  font-size: 1.6rem;
  margin-top: 0.8rem;
  margin-bottom: 5.9rem;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.primary};
  }
}
`

const OnBoardingPosition: React.FC<OnBoardingPositionProps> = (props: OnBoardingPositionProps) => {
  const [work, setWork] = useState<string>('')
  const [company, setCompany] = useState<string>('')

  const store = React.useContext(storeContext)
  if (!store) throw Error('store shouldn\'t be null')

  const initSolGit = async () => {
    try {
      await props.register()
      props.openOnboardingModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    console.log('포지션',work, company)
    console.log('유저 정보', store.user.onboardingInfo)
    props.setOnboardingInfo({ work: work, company: company })
    initSolGit()
  }

  const handleSkip = () => {
    console.log('포지션', work,company)
    console.log('유저 정보', store.user.onboardingInfo)

    initSolGit()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    name === 'work' ? setWork(value) : setCompany(value)
  }

  return <SolGitOnBoardingPosition>
    <div className='header'>4단계 : 회사 포지션 입력</div>
    <div className='main-text'>다니는 회사와 포지션을 알려주세요.</div>
    <div className='sub-text'>솔깃은 서로 다른 포지션/경력의 유저들이 콘텐츠와 활용 팁을 공유하는 공간이예요.</div>
    <div className='input-area'>
      <input type='text' name='work' placeholder='<포지션 입력>' onChange={handleChange} />
      <span>@</span>
      <input type='text' name='company' placeholder='<회사> 입력' onChange={handleChange} />
    </div>
    <button className='submit-btn' onClick={handleSubmit}>저장 후 서비스 시작</button>
    <button className='skip-btn' onClick={handleSkip}>스킵하기</button>
  </SolGitOnBoardingPosition>
}

export default OnBoardingPosition