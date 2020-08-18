import React from 'react'
import styled from 'styled-components'

type Props = {
  imageHeight: number
}
export default function DummyCard(props: Props) {
  return (
    <Container>
      <DummyProfileContainer>
        <DummyProfileImage />
        <DummyProfileNicknameBox />
      </DummyProfileContainer>
      <DummyImage height={props.imageHeight} />
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 30px;
  margin-right: 20px;
  display: flex;
  width: 268px;
  flex-direction: column;
  @media (max-width: 1272px){
    flex: 23%; 
  }

  @media (max-width: 930px){
    flex: 32%; 
  }
  position: relative;
`

const DummyImage = styled.div<{ height: number }>`
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dddddd;
  height: ${(props) => props.height}px;
`

const DummyProfileContainer = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const DummyProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #dddddd;
`

const DummyProfileNicknameBox = styled.div`
  width: 150px;
  height: 30px;
  border-radius: 6px;
  background-color: #dddddd;
  margin-left: 10px;
`