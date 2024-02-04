import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`
export const IconWrapper = styled.span`
  color: ${props => props.color};
`
