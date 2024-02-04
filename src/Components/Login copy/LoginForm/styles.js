import { styled } from 'styled-components'
import Form from 'antd/es/form/Form'
import { Button, Input } from 'antd'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

export const FormContainer = styled(Form)`
  width: 100%;
  margin: 1rem 0;
`

export const HeadingText = styled.div`
  color: #424344;
  font-size: 24px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 18px;
  }
`

export const GrayText = styled.div`
  color: #6c757d;
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`

export const LoginInput = styled(Input)`
  padding: 0.5rem !important;
  border: 1px sold #6c5ffc !important;

  .ant-input-group-addon {
    background-color: #6c5ffc;
    color: white;
  }
`

export const FormButton = styled(Button)`
  width: 100%;
  background-color: #6c5ffc;
  color: white;
  border: none;
`
