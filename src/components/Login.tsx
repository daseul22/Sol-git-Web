import React, { Dispatch, SetStateAction } from 'react'
import { useObserver } from 'mobx-react-lite'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import exampleImage from '@/assets/example.png'
import Button from '@/components/Button'
import styled from 'styled-components'
import { storeContext } from '@/stores/context'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : ''

const SolGitLogin = styled.div`
display: flex;
flex-direction: column;
align-items: center;
.login__title {
font-size: 1.6rem;
font-weight: bold;
letter-spacing: -0.02rem;
color: #091957;
&--long {
font-weight: bold;
margin-top: 3.2rem;
display: flex;
flex-direction: column;
align-items: center;
font-size: 2.4rem;
span {
color: ${props => props.theme.secondary};
}
}
}
img {
margin: 2.9rem 0 3.8rem;
width: 25rem;
height: 17.3rem;
}
button {
font-weight: bold;
border-radius: 1.6rem;
padding: 1.2rem 6rem;
}
`

type LoginProps = {
  openLoginModal?: Dispatch<SetStateAction<boolean>>
  openOnboardingModal?: Dispatch<SetStateAction<boolean>>
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {

  const store = React.useContext(storeContext)
  // TODO: 스토어 없을시 에러메세지 변수화
  if (!store) throw Error('store shouldn\'t be null')
  return useObserver(() => {

    const handleGoogleLoginSuccess = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      const googleId = (response as GoogleLoginResponse).tokenObj.id_token
      try {
        const { data } = await store.user.login(googleId)
        store.user.setOnboardingInfo({ googleIdToken: googleId })
        if (data.authorizeWithGoogle) {
          store.user.setUser(data.authorizeWithGoogle)
        } else {
          if (props.openOnboardingModal) props.openOnboardingModal(true)
        }
      } catch (error) {
        if (props.openOnboardingModal) props.openOnboardingModal(true)
      }
      // finally {
      //   if (props.openLoginModal) props.openLoginModal(false)
      // }
    }

    return (
      <SolGitLogin className="login">
        <div className="login__title">
          Sol-git한 개발자들의 메모장
        </div>
        <div className="login__title--long">
          <div>
            <span>솔깃</span>
            <span role="img" aria-label="eyes">👀</span>과 함께
          </div>
          <div>여러분이 찾은 솔깃한 콘텐츠들을 저장하고 공유해요.</div>
        </div>
        <img src={exampleImage} alt="example"></img>
        <GoogleLogin
          clientId={clientId}
          buttonText="Google 로그인"
          render={(renderProps) =>
            (<Button
              onClick={renderProps.onClick}
            >Google 로그인</Button>)}
          onSuccess={handleGoogleLoginSuccess}
        />
      </SolGitLogin>
    )
  })
}

export default Login
