import React from 'react'
import styled from 'styled-components'

type CategoryProps = {
  categories: string[]
}

const SolGitCategory = styled.div`
div {
  font-size: 2rem;
  font-weight: bold;
  margin: 3.2rem 0 1.6rem 0;
}
button {
  display: block;
  width: 16.6rem;
  text-align: start;
  font-size: 1.8rem;
  border-radius: 0.8rem;
  padding: 0.8rem;
  &:hover {
    background-color: white;
    cursor: pointer;
  }
}
`

const Category = ({categories}: CategoryProps) => {
  const handleClick = () => {
    console.log('clicked')
  }

  return <SolGitCategory>
    <div>직군별</div>
    {categories.map((folder, idx) => (
      <button onClick={handleClick} key={idx}>{folder}</button>
    ))}
  </SolGitCategory>
}

export default Category