import React from 'react'
import styled from 'styled-components'
import Button from '@/components/Button'

const SolGitIntro = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
.header-img {
  margin-top: 3rem;
  margin-bottom: 0.8rem;
}
font-size: ${props => props.theme.fontSizeM}};
.catch-phrase {
&--long {
display: flex;
flex-direction: column;
align-items: center;
font-weight: bold;
letter-spacing: -0.01em;
}
&--short {
font-size: ${props => props.theme.fontSizeXl};
font-weight: bold;
margin: 2.4rem 0;
span {
  color: ${props => props.theme.secondary};
  }
}
}
button {
font-size: 2.4rem;
font-weight: bold;
}
`



const Intro: React.FC = () => {
  const redirectToDownloadUrl = () => {
    // TODO
    window.open("https://chrome.google.com/webstore/detail/sol-git/kbimacmlmkmnlhealjelpmkiblgadbgm","_blank")
    console.log('redirectToDownloadUrl')
  }
  return (
    <SolGitIntro>
      <img className='header-img' src='icons/clipart2013627 1.png' />
      <div className="catch-phrase--long">
        <div>내가 찾는 자료와 정보들이 너에게도 도움이 되는 곳</div>
      </div>
      <div className="catch-phrase--short">짧고 솔직해서 더 솔깃한 자료 서칭과 공유의 장, <span>솔깃 Sol-git</span></div>
      <Button onClick={redirectToDownloadUrl}>Chrome에 추가</Button>
    </SolGitIntro>
  )
}

export default Intro
