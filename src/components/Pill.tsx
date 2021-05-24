import React from 'react'
import styled from 'styled-components'

type PillProps = {
  children: string | HTMLElement;
}

const SolGitPill = styled.div`
border: 1px solid ${props => props.theme.primary};
border-radius: 20rem;
font-size: 1.6rem;
padding: 0.5rem 2rem;
display: inline-block;
color: ${props => props.theme.primary};
`

const Pill = (props: PillProps): JSX.Element => {
  return (
    <SolGitPill className="pill">
      {props.children}
    </SolGitPill>
  )
}

export default Pill
