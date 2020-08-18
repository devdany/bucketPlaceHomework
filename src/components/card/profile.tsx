import React from 'react'
import styled from 'styled-components'

type Props = {
  profile_img: string
  nickname: string
}
export default function Profile(props: Props) {
  return (
    <Container>
      <ProfileImage src={props.profile_img} />
      <ProfileNickname>{props.nickname}</ProfileNickname>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
`

const ProfileNickname = styled.span`
  font-family: AppleSDGothicNeo;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.27;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.74);
  margin-left: 10px;
`