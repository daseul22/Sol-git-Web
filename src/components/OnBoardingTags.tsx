import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { OnboardingStepProps } from '@/types/user'
import { FetchResult } from '@apollo/client'
import Button from '@/components/Button'
import styled from 'styled-components'

type OnBoardingTagsProps = {
  // TODO: type 정교화
  getTags: () => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  toNextStep: Dispatch<SetStateAction<void>>;
  setOnboardingInfo: (info: Record<string, string | number[]>) => void;
}

type Tag = {
  id: number;
  tag: string;
  kind: string;
}

const SolGitOnBoardingTags = styled.div`
flex-grow: 1;
display: flex;
align-items: center;
flex-direction: column;
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
  margin-top: 2.2rem;
  font-size: ${props => props.theme.fontSizeXl};
  font-weight: ${props => props.theme.fontWeightB};
}
.sub-text {
  margin-top: 0.8rem;
  margin-bottom: 2.9rem;
  font-size: ${props => props.theme.fontSizeM};
}
.tags {
  margin-bottom: 5rem;
  width: 50rem;
  > button {
    margin: 0.5rem;
  }
}
.footer {
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  > button {
    font-weight: bold;
    height: 4.8rem;
  }
}
`

const OnBoardingTags: React.FC<OnBoardingTagsProps> = (props: OnBoardingTagsProps) => {

  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<number[]>([])

  // const tags = ['#JavaScript', '#Java', '#React', '#Python', '#Vue.js', '#Angular', '#Node.js',
  // '#Git/Github', '#서버/백엔드', '#프론트엔드', '#보안', '#안드로이드', '#iOS', '#웹', '#데이터과학',
  // '#데이터베이스', '#머신러닝', '#툴/생산성', '#커리어', '#블록체인', '#업계이야기']
  const fetchAndSetTags = async () => {
    const { data } = await props.getTags()
    setTags(data.findManyTag)
  }
  useEffect(() => {
    fetchAndSetTags()
    console.log(tags)
  },[])

  const handleSelectTag = (id: number) => {
    // TODO
    setSelectedTags([...selectedTags, id])
  }

  const handleUnSelectTag = (id: number) => {
    setSelectedTags(selectedTags.filter(el => el !== id))
  }

  const handleGoNext = () => {
    props.setOnboardingInfo({ tags: selectedTags })
    props.toNextStep()
  }

  return <SolGitOnBoardingTags>
    <div className='header'>3단계 : 태그 선택</div>
    <div className='line'></div>
    <div className='main-text'>관심있는 태그를 선택해주세요.</div>
    <div className='sub-text'>해당 태그에 관심있는 유저들이 찾아보는 콘텐츠를 볼 수 있어요.</div>
    <div className="tags">
    {tags.map((tag) => selectedTags.indexOf(tag.id) > -1 ?
      <Button key={tag.id} onClick={() => handleUnSelectTag(tag.id)}>{tag.tag}</Button>
      : <Button key={tag.id} outline={true} onClick={() => handleSelectTag(tag.id)}>{tag.tag}</Button>)}
    </div>
    <div className='footer'>
      <Button onClick={handleGoNext}>저장 후 다음으로</Button>
    </div>
  </SolGitOnBoardingTags>
}

export default OnBoardingTags
