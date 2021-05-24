import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Button from '@/components/Button'

type OnBoardingManualProps = {
  toNextStep: Dispatch<SetStateAction<void>>;
}

const SolGitOnBoardingManual = styled.div`
display: flex;
flex-direction: column;
align-items: center;
flex-grow: 1;
.header {
  text-align: center;
  background-color: #EB45870F;
  font-size: 1.6rem;
}
.line {
  height: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.gray};
}
.main-text {
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;
  text-align: center;
  font-size: ${props => props.theme.fontSizeXl};
  font-weight: ${props => props.theme.fontWeightB};
  > div > span {
    color: ${props => props.theme.secondary};
  }
}
.manual {
  display: flex;
  align-items: center;
  margin: 0 4rem 2.5rem 4rem;
  > div {
    margin: 1.5rem;
  }
}
.image-box {
  width: 18.8rem;
  height: 17.7rem;
  background-color: ${props => props.theme.background};
}
.sub-title {
  width: 16rem;
  margin-bottom: 1rem;
  word-break: keep-all;
  font-size: ${props => props.theme.fontSizeM};
  font-weight: bold;
  
}
.sub-text {
  width: 21rem;
  word-break: keep-all;
  font-size: ${props => props.theme.fontSizeS};
  
  > span {
    color: ${props => props.theme.secondary};
  }
}
.footer {
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  > button {
    height: 4.8rem;
    font-weight: bold;
  }
}
`

const OnBoardingManual: React.FC<OnBoardingManualProps> = (props: OnBoardingManualProps) => {

  const handleClick = () => {
    props.toNextStep()
  }

  return <SolGitOnBoardingManual>
    <div className='header'>Sol-git한 개발자들의 메모장</div>
    <div className='line'></div>
    <div className='main-text'>
      <div><span>솔깃</span>👀 과 함께</div>
      <div>여러분이 찾은 솔깃한 콘텐츠들을 저장하고 공유해요.</div>
    </div>
    <div className='manual'>
      <div className='image-box'></div>
      <div className='text-box'>
        <div className='sub-title'>인터넷 서핑하며 찾은 유용한 콘텐츠를 바로 저장하고 공유</div>
        <div className='sub-text'><span>크롬 확장자</span>를 툴바에 고정하고 콘텐츠에 관한 생각과 팁들을 바로 공유하세요.</div>
      </div>
      <div className='image-box'></div>
      <div className='text-box'>
        <div className='sub-title'>홈피드에 공유되는 유저들이 찾은 자료들</div>
        <div className='sub-text'><span>홈피드</span>에서는 비슷한 관심사를 가진 유저들이 보는 콘텐츠들과 팁을 확인할 수 있어요.</div>
      </div>
    </div>

    <div className='footer'>
      <Button onClick={handleClick}>Google계정으로 솔깃 서비스 시작하기</Button>
    </div>
  </SolGitOnBoardingManual>
}

export default OnBoardingManual
