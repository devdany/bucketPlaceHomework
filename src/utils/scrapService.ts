const SCRAP_KEY = 'scraped'

export const scrap = (id: number) => {
  const storageData = localStorage.getItem(SCRAP_KEY)
  if (!storageData) {
    const newScrapedList = [id]
    localStorage.setItem(SCRAP_KEY, JSON.stringify(newScrapedList))
    return
  }

  try {
    const scrapedList: number[]  = JSON.parse(storageData)
    if (!scrapedList.includes(id)) {
      scrapedList.push(id)
      localStorage.setItem(SCRAP_KEY, JSON.stringify(scrapedList))
    }
  } catch (err) {
    // local scraped data format이 깨졌음
    // local scrap data 초기화 or 서버로부터 리로드
    const newScrapedList = [id]
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
    const scrapedList: number[]  = JSON.parse(storageData)
    const filteredScraped = scrapedList.filter((scrapedId) => scrapedId !== id)
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
    const scrapedList: number[] = JSON.parse(storageData)
    return scrapedList.includes(id)
  } catch (err) {
    return false
  }
}