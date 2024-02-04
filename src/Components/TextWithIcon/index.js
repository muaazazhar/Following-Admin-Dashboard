import React from 'react'
import { Container, IconWrapper } from './styles'


export default function TextWithIcon({text, color, icon, onClick}) {
  return (
    <Container onClick={onClick}>
    <IconWrapper color= {color}>{icon}</IconWrapper>
    {text}
    </Container>
  )
}
