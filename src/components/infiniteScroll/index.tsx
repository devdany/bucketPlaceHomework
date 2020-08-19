import React, { useState } from 'react'

import Card from '@components/card'
import DummyCard from './dummyCard'
import { Feed } from '../../types/feed'
import { loadAdditionalData } from '@utils/loadData'
import styled from 'styled-components'

type Props = {
  feeds: Feed[]
  appendFeeds: (feeds: Feed[]) => void
}

let isLastPage = false
export default function InfiniteScroll(props: Props) {
  const [currentImageBoxHeight, setCurrentImageBoxHeight] = useState(0)
  const [dummys, setDummys] = useState<JSX.Element[]>([])
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

  const handleScroll = (e: any) => {
    if (props.feeds.length < 20) {
      return
    }
    // 맨 바닥에 닿기전 다음페이지를 로드해서 스크롤의 끊김을 최소화
    const GAP_BETWEEN_LOAD_DATA_AND_SCROLL_POSITION = 250
    const totalScrollHeight = e.target.scrollHeight - e.target.clientHeight
    const scrollPosition = e.target.scrollTop
    if (totalScrollHeight - scrollPosition < GAP_BETWEEN_LOAD_DATA_AND_SCROLL_POSITION) {
      // 추가데이터를 로드하기전, 더미 컴포넌트를 추가한후 실제 데이터가 들어오면 더미를 갈아끼운다.
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
  }
  return (
    <ScrollContainer onScroll={handleScroll}>
      {props.feeds.map((feed) => {
        return (
          <Card key={'feed-' + feed.id} onChangeImageHeight={onChangeImageHeight} feed={feed} imageHeight={currentImageBoxHeight} />
        )
      })}
      {dummys.map((dummy) => dummy)}
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