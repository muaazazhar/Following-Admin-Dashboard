import React from 'react'
import { Input, Form } from 'antd'
import {
  Container,
  FormContainer,
  HeadingText,
  GrayText,
  FormButton,
  LoginInput
} from './styles'
import { MdEmail } from 'react-icons/md'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

export default function LoginForm ({ onSubmit }) {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = async () => {
    const values = await form.validateFields()
    onSubmit(values)
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Container>
      <>
        <HeadingText>SIGN IN!</HeadingText>
        <GrayText>Please enter your login credentials</GrayText>
      </>

      <FormContainer
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item name='email'>
          <LoginInput placeholder='Email' addonBefore={<MdEmail />} />
        </Form.Item>
        <Form.Item name='password'>
          <LoginInput
            placeholder='Password'
            type='password'
            addonBefore={<AiFillEyeInvisible />}
          />
        </Form.Item>
        <FormButton type='primary' htmlType='submit' onClick={onFinish}>
          Submit
        </FormButton>
      </FormContainer>
    </Container>
  )
}
