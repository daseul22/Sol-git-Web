import React from 'react'
import styled from 'styled-components'
import Pill from '@/components/Pill'

type TagProps = {
  tags: string[]
}

const SolGitTag = styled.div`
.tag-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.6rem;
  color: ${props => props.theme.primary};
}
.tag {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .pill {
  padding: 0.4rem 2.6rem;
  color: ${props => props.theme.gray};
  border: 1px solid ${props => props.theme.gray};
  background-color: white;
  font-size: 1.6rem;
  &:not(:last-child) {
    margin-bottom: 0.8rem;
  }
  }
}
`

const Tag = ({ tags }: TagProps) => {
  const handleClickTag = () => {
    console.log('clicked')
  }

  return <SolGitTag>
    <div className='tag-title'>관심 태그</div>
    <div className='tag'>
      {tags.map((tag, tagIndex) => <Pill key={tagIndex}>{`#${tag}`}</Pill>)}
    </div>
  </SolGitTag>
}

export default Tag
