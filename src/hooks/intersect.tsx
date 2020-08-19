/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'

export const useIntersection = (onIntersectAction: () => void, updateTriggers: any[]) => {
  const onIntersect = async (entries: any, observer: any) => { 
    const entry = entries[0]
    if (entry.isIntersecting) {
      observer.unobserve(entry.target)
      await onIntersectAction()
      observer.observe(entry.target)
    }
  }

  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 1 });
    if (ref) {
      const scrollBoxElement: any = ref.current
      observer.observe(scrollBoxElement)
    }
    return () => observer.disconnect()
  }, [...updateTriggers])

  return [ref]
}