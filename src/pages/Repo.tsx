import React from 'react'
import Repo from '@/components/Repo'
import styled from 'styled-components'

const SolGitRepoPage = styled.div`
//border: 2px solid red;
min-height: 100%;
flex-grow: 1;
`

const RepoPage: React.FC = () => {
  return (<SolGitRepoPage>
    <Repo />
  </SolGitRepoPage>)
}

export default RepoPage
