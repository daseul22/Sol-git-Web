import React from 'react'
import styled from 'styled-components'

type ButtonProps = {
  color?: string
  radius?: string
  children: string | React.ReactChild[];
  onClick: () => void;
  outline?: boolean;
  className?: string;
}

const SolGitButton = styled.button`
background-color: ${props => props.theme.primary};
color: white;
font-size: 1.8rem;
padding: 1.3rem 2rem;
border-radius: ${props => props.theme.medium};
display: inline-block;
cursor: pointer;
&:hover {
  background-color: ${props => props.theme.primaryL};
}
&.outline {
background-color: white;
color: ${props => props.theme.primary};
border: 1px solid ${props => props.theme.primary};
&:hover {
  background-color: ${props => props.theme.primary};
  color: white;
}
}
`

//border-radius를 props로 받아서 처리하려 했으나 안됨
// ${props => {
//   const selectedRadius = props.theme[props.radius]
//   return css`
//     border-radius: ${selectedRadius}
//   `
// }};

const Button = (props: ButtonProps): JSX.Element => {

  const buttonClass = `${props.outline ? 'outline' : ''}`

  return (
    <SolGitButton
      onClick={props.onClick}
      className={`button ${props.className ? props.className : ''} ${buttonClass}`}
    >{props.children}</SolGitButton>
  )
}

export default Button
