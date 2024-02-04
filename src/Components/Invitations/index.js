import React from 'react'
import { Container, Text, Number } from './styles'

export default function Invitations ({ status, text, number }) {
  return (
    <Container status={status}>
      <Text>{text}</Text>
      <Number>{number}</Number>
    </Container>
  )
}
