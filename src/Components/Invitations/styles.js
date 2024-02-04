import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  @media (max-width: 480px) {
    border-right: none;
  }
  ${props =>
    props.status === 'sent'
      ? `color: #6C5FFC; border-right: 1px solid #E9EDF4;`
      : props.status === 'accepted'
      ? `color: #01AB3B; border-right: 1px solid #E9EDF4;`
      : props.status === 'pending'
      ? `color: #FFAA46;`
      : ``}
`
export const Text = styled.div`
  font-size: 14px;
`

export const Number = styled.div`
  font-size: 32px;
  font-weight: 700;
`
