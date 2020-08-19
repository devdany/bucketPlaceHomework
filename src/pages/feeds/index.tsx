import React, { useEffect, useState } from 'react'

import { Check } from '@components/toggle'
import { Feed } from '../../types/feed'
import InfiniteScroll from '@components/infiniteScroll'
import { getScrapedList } from '@utils/scrapService'
import { loadInitalData } from '@utils/loadData'
import styled from 'styled-components'

type Props = {

}

export default function Feeds(props: Props) {
  const [feeds, setFeeds] = useState<Feed[]>([])
  const [isFilteredScrap, setFilteredScrap] = useState(false)

  useEffect(() => {
    loadInitalData()
      .then((feeds) => {
        setFeeds(feeds)
      })
      .catch((err) => {
        // data load fail
        // alert check network
        console.error(err)
      })
  }, [])

  const filterScraped = () => {
    setFilteredScrap(true)
  }

  const handleUncheckFilterScraped = () => {
    setFilteredScrap(false)
  }

  const appendFeeds = (appendFeeds: Feed[]) => {
    setFeeds([...feeds, ...appendFeeds])
  }
  return (
    <Container>
      <ContentsBox>
        <TopBox>
          <Check onRelease={handleUncheckFilterScraped} onCheck={filterScraped} label={'스크랩한 것만 보기'}/>
        </TopBox>
        <InfiniteScroll appendFeeds={appendFeeds} feeds={isFilteredScrap ? getScrapedList() : feeds}/>
      </ContentsBox>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const ContentsBox = styled.div`
  width: 1256px;
  height: 100%;
  padding: 0px 50px 0px 50px;
`

const TopBox = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-left: 10px;
  height: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`