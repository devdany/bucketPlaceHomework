import React, { useEffect } from 'react'
import { isScrap, scrap, unscrap } from '@utils/scrapService'

import { Feed } from '../../types/feed'
import Profile from './profile'
import { Scrap } from '@components/toggle'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'

type Props = {
  feed: Feed
  onChangeImageHeight: (height: number) => void
  height?: number
}
function Card(props: Props) {
  const handleScrap = () => {
    scrap(props.feed.id)
  }

  const handleUnscrap = () => {
    unscrap(props.feed.id)
  }

  useEffect(() => {
    const PROFILE_HEIGHT = 36
    const MARGIN_PROFILE_AND_IMAGE = 10
    if (props.height) {
      const imageHeight = props.height - PROFILE_HEIGHT - MARGIN_PROFILE_AND_IMAGE
      props.onChangeImageHeight(imageHeight)
    }
  }, [props.height])

  return (
    <Container>
      <Profile profile_img={props.feed.profile_image_url} nickname={props.feed.nickname}/>
      <ImageBox>
        <FeedImage src={props.feed.image_url}/>
      </ImageBox>
      <ScrapButtonBox>
        <Scrap onCheck={handleScrap} onRelease={handleUnscrap} default={isScrap(props.feed.id)}/>
      </ScrapButtonBox>
    </Container>
  )
}

export default withResizeDetector(Card)

// ~ 1272 고정크기 4개
// 1272 ~ 930 -> 사이즈 줄여가며 4개
// 930 ~ 642 -> 사이즈 줄여가며 3개
const Container = styled.div`
  margin-bottom: 30px;
  margin-right: 20px;
  display: flex;
  width: 268px;
  flex-direction: column;
  @media (max-width: 1272px){
    flex: 23%; 
  }

  @media (max-width: 930px){
    flex: 32%; 
  }
  position: relative;
`

const ImageBox = styled.div`
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FeedImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform .1s ease;
  &:hover {
    transform: scale(1.1);
  }
`

const ScrapButtonBox = styled.div`
  width: 32px;
  height: 32px;
  bottom: 10px;
  right: 10px;
  position: absolute
`