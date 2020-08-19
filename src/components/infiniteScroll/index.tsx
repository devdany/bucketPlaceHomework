import React, { useState } from 'react'

import Card from '@components/card'
import DummyCard from './dummyCard'
import { Feed } from '../../types/feed'
import { loadAdditionalData } from '@utils/loadData'
import styled from 'styled-components'
import { useIntersection } from '@hooks/intersect'

type Props = {
  feeds: Feed[]
  appendFeeds: (feeds: Feed[]) => void
}

let isLastPage = false
export default function InfiniteScroll(props: Props) {
  const [currentImageBoxHeight, setCurrentImageBoxHeight] = useState(0)
  const [dummys, setDummys] = useState<JSX.Element[]>([])
  
  const loadData = () => {
    if (props.feeds.length < 20) {
      return
    }
    if (!isLastPage) {
      setDummys([...dummys, ...generateDummys()])
    }
    loadAdditionalData()
      .then((feeds) => {
          props.appendFeeds(feeds)
          isLastPage = feeds.length < 20
          setDummys([])
      })
      .catch((err) => {
        // dummy 없애기 & load fail notify OR dummy를 로드 실패한 상태 아이템으로 변경
        setDummys([])
      })
  }
  const [scrollBox] = useIntersection(loadData, [props, props.feeds, currentImageBoxHeight], isLastPage)

  const onChangeImageHeight = (height: number) => {
    const MIN_HEIGHT = 180
    if (height > MIN_HEIGHT && currentImageBoxHeight !== height) {
      setCurrentImageBoxHeight(height)
    }
  }

  const generateDummys = () => {
    const DATA_COUNT_PER_PAGE = 20
    const generatedDummys = []
    for (let i = dummys.length + 1; i <= dummys.length + DATA_COUNT_PER_PAGE; i++ ) {
      generatedDummys.push(<DummyCard key={i} imageHeight={currentImageBoxHeight}/>)
    }
    return generatedDummys
  }
  return (
    <ScrollContainer>
      {props.feeds.map((feed) => {
        return (
          <Card key={'feed-' + feed.id} onChangeImageHeight={onChangeImageHeight} feed={feed} imageHeight={currentImageBoxHeight} />
        )
      })}
      {dummys.map((dummy) => dummy)}
      <LoadAddDataArea ref={scrollBox} />
    </ScrollContainer>
  )
}

const ScrollContainer = styled.div`
  height: calc(100% - 100px);
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

const LoadAddDataArea = styled.div`
  width: 100%;
  height: 10px;
`
