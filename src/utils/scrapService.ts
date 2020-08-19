import { Feed } from '../types/feed'

const SCRAP_KEY = 'scraped'

export const scrap = (feed: Feed) => {
  const storageData = localStorage.getItem(SCRAP_KEY)
  if (!storageData) {
    const newScrapedList = [feed]
    localStorage.setItem(SCRAP_KEY, JSON.stringify(newScrapedList))
    return
  }

  try {
    const scrapedList: Feed[]  = JSON.parse(storageData)
    if (!isScrap(feed.id)) {
      scrapedList.push(feed)
      localStorage.setItem(SCRAP_KEY, JSON.stringify(scrapedList))
    }
  } catch (err) {
    // local scraped data format이 깨졌음
    // local scrap data 초기화 or 서버로부터 리로드
    const newScrapedList = [feed]
    localStorage.setItem(SCRAP_KEY, JSON.stringify(newScrapedList))
    return
  }
}

export const unscrap = (id: number) => {
  const storageData = localStorage.getItem(SCRAP_KEY)
  if (!storageData) {
    return
  }

  try {
    const scrapedList: Feed[]  = JSON.parse(storageData)
    const filteredScraped = scrapedList.filter((feed) => feed.id !== id)
    localStorage.setItem(SCRAP_KEY, JSON.stringify(filteredScraped))
  } catch (err) {
    // local scraped data format이 깨졌음
    // local scrap data 초기화 or 서버로부터 리로드
    localStorage.setItem(SCRAP_KEY, JSON.stringify([]))
  }
}

export const isScrap = (id: number) => {
  const storageData = localStorage.getItem(SCRAP_KEY)
  if (!storageData) {
    return false
  }

  try {
    const scrapedList: Feed[] = JSON.parse(storageData)
    const findScraped = scrapedList.find((feed) => feed.id === id)
    return findScraped !== undefined
  } catch (err) {
    return false
  }
}

export const getScrapedList = () => {
  const storageData = localStorage.getItem(SCRAP_KEY)

  if (!storageData) {
    return []
  }

  try {
    const scrapedList: Feed[] = JSON.parse(storageData)
    return scrapedList
  } catch (err) {
    return []
  }
}