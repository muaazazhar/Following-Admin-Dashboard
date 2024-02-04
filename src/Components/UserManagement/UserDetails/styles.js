import { styled } from 'styled-components'
import { Button } from 'antd'

export const CardContainer = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 7px;
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-ites: center;
  padding: 1rem 0;
`

export const BtnContainer = styled.div`
  display: none;
  @media (min-width: 481px) {
    display: flex;
    gap: 1rem;
  }
`
export const MobileBtnContainer = styled.div`
  display: none;
  @media (max-width: 480px) {
    display: flex;
    gap: 0.5rem;
  }
`

export const MobileBtn = styled(Button)`
  border: none;
  box-shadow: 0 0 0 0;
  font-size: 16px;
  color: ${props => props.color};
`

export const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
`

export const Divider = styled.div`
  border-top: 1px solid #e9edf4;
`

export const Heading = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding: 1rem 0;
`

export const TextBox = styled.div`
  font-size: 0.8rem;
`
export const InviteContainer = styled.div`
  display: flex;
  padding: 1rem 0;
  @media (max-width: 480px) {
    border-right: none;
    flex-wrap: wrap;
    justify-content: center;
  }
`
export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 480px) {
    justify-content: center;
  }
`
