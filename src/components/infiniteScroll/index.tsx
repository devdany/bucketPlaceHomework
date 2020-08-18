import React, { useState } from 'react'

import Card from '@components/card'
import DummyCard from './dummyCard'
import { Feed } from '../../types/feed'
import styled from 'styled-components'

type Props = {
  feeds: Feed[]
}
export default function InfiniteScroll(props: Props) {
  const [currentImageBoxHeight, setCurrentImageBoxHeight] = useState(0)
  const onChangeImageHeight = (height: number) => {
    setCurrentImageBoxHeight(height)
  }
  return (
    <ScrollContainer>
      {props.feeds.map((feed) => {
        return (
          <Card key={'feed-' + feed.id} onChangeImageHeight={onChangeImageHeight} feed={feed} />
        )
      })}
      <DummyCard imageHeight={currentImageBoxHeight}/>
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