import { Feed } from '../types/feed'
import axios from 'axios'

let currentPage = 1
const S3_BUCKET_URL = 'https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test'
export const loadInitalData = async () => {
  const result = await axios.get(`${S3_BUCKET_URL}/cards/page_1.json`)
  const feeds: Feed[] = result.data
  return feeds
}

export const loadAdditionalData = async () => {
  const targetPage = currentPage + 1
  try {
    const result = await axios.get(`${S3_BUCKET_URL}/cards/page_${targetPage}.json`)
    if (!result || !result.data) {
      return []
    }
    const feeds: Feed[] = result.data
    if (feeds.length === 0) {
      return []
    }

    currentPage ++
    return feeds
  } catch (err) {
    return Promise.reject(err)
  }
}
