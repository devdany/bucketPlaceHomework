import React, { useState } from 'react'

import checkedImg from '../assets/images/check.png'
import { mainLightBlue } from '@theme/color'
import scrapImg from '../assets/images/scrap.png'
import styled from 'styled-components'
import unscrapImg from '../assets/images/unscrap.png'

type Props = {
  default?: boolean
  label?: string
  onCheck?: () => void
  onRelease?: () => void 
}
export function Check(props: Props) {
  const [checked, setChecked] = useState(props.default)
  const handleCheck = () => {
    setChecked(!checked)

    // check 상태이면 release, release상태이면 체크
    if (checked) {
      if (props.onRelease) {
        props.onRelease()
      }
    } else {
      if (props.onCheck) {
        props.onCheck()
      }
    }
  }
  return (
    <CheckContainer onClick={handleCheck}>
      {checked ? (<Checked src={checkedImg}/>) : (<UnChecked></UnChecked>)}
      <Label>{props ? props.label : ''}</Label>
    </CheckContainer>
  )
}

const CheckContainer = styled.div`
  height: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`

const Checked = styled.img`
  width: 24px;
  height: 24px;
`

const UnChecked = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  border: 1px solid ${mainLightBlue};
`

export function Scrap(props: Props) {
  const [checked, setChecked] = useState(props.default)
  const handleCheck = () => {
    setChecked(!checked)

    // check 상태이면 release, release상태이면 체크
    if (checked) {
      if (props.onRelease) {
        props.onRelease()
      }
    } else {
      if (props.onCheck) {
        props.onCheck()
      }
    }
  }
  return (
    <ScrapContainer onClick={handleCheck}>
      <ScrapImage src={checked ? scrapImg : unscrapImg}/>
    </ScrapContainer>
  )
}

const ScrapContainer = styled.div`
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 5;
`

const ScrapImage = styled.img`
  width: 32px;
  height: 32px;
`

const Label = styled.span`
  font-size: 15px;
  font-family: AppleSDGothicNeo;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #424242;
  margin-left: 6px;
  user-select: none;
`