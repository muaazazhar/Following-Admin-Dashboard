import React from 'react'
import { PrimaryBtn } from './styles'


export default function PrimaryButton({icon, text, onClick}) {
  return (
    <PrimaryBtn type='primary' onClick={onClick}>
    {icon}
    {text}
    </PrimaryBtn>
  )
}
