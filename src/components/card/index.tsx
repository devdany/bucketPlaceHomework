import React, { useEffect, useState } from 'react'
import { isScrap, scrap, unscrap } from '@utils/scrapService'

import { Feed } from '../../types/feed'
import Profile from './profile'
import { Scrap } from '@components/toggle'
import { lightGray } from '@theme/color'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'

type Props = {
  feed: Feed
  onChangeImageHeight: (height: number) => void
  imageHeight: number
  height?: number
}
const PROFILE_HEIGHT = 36
const MARGIN_PROFILE_AND_IMAGE = 10
function Card(props: Props) {
  const [isLoadedImage, setLoadedImage] = useState(false)
  const handleScrap = () => {
    scrap(props.feed)
  }

  const handleUnscrap = () => {
    unscrap(props.feed.id)
  }

  const handleLoadImage = () => {
    setLoadedImage(true)
  }

  useEffect(() => {
    if (!props.height) {
      return
    }
    const imageHeight = props.height - PROFILE_HEIGHT - MARGIN_PROFILE_AND_IMAGE
    props.onChangeImageHeight(imageHeight)
  }, [props, props.height])

  return (
    <Container>
      <Profile profile_img={props.feed.profile_image_url} nickname={props.feed.nickname}/>
      <ImageBox isLoaded={isLoadedImage} height={props.imageHeight}>
        <FeedImage onLoad={handleLoadImage} src={props.feed.image_url}/>
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
  margin-right: 10px;
  margin-left: 10px;
  display: flex;
  width: 268px;
  flex-direction: column;
  @media (max-width: 1272px){
    width: 22%; 
  }

  @media (max-width: 980px){
    width: 30%; 
  }

  @media (max-width: 700px){
    width: 45%; 
  }
  position: relative;
`

const ImageBox = styled.div<{ isLoaded: boolean, height: number }>`
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
  ${(props) => props.isLoaded ? 'cursor: pointer;' : `background-color: ${lightGray}; height: ${props.height}px;`}
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