import React, { useEffect } from 'react'

import routePath from '@routes/path'
import styled from 'styled-components'

type Props = {
  history: any
}
export default function Home(props: Props) {
  useEffect(() => {
    props.history.push(routePath.FEEDS)
  }, [props.history])
  return (
    <Container>

    </Container>
  )
}

const Container = styled.div`

`