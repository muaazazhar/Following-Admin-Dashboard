import React from 'react'
import { SecondaryBtn } from './styles'

export default function SecondaryButton ({ text, icon, onClick }) {
  return (
    <SecondaryBtn type='secondary' onClick={onClick}>
      {icon}
      {text}
    </SecondaryBtn>
  )
}
