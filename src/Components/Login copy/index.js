import React from 'react'
import {
  Container,
  LeftContainer,
  RightContainer,
  ImageContainer,
  BackContainer
} from './styles'
import LoginForm from './LoginForm'
import img from '../../assets/images/loginMain.png'
import imgBack from '../../assets/images/Back.png'
export default function LoginComonent ({ onSubmit, errorMessage }) {
  return (
    <div
      style={{
        padding: '1rem',
        backgroundColor: '#88a9ef',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Container>
        <BackContainer>
          <div>
            <img src={imgBack} />
          </div>
          <div>Back</div>
        </BackContainer>
        <LeftContainer>
          <ImageContainer>
            <img src={img} alt='login' style={{ width: '100%' }} />
          </ImageContainer>
        </LeftContainer>
        <RightContainer>
          <LoginForm onSubmit={onSubmit} />
          {errorMessage && (
            <div style={{ color: 'red', fontSize: '13px', fontWeight: 500 }}>
              {errorMessage}, try again.
            </div>
          )}
        </RightContainer>
      </Container>
    </div>
  )
}
