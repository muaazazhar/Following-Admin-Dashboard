import { styled } from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  overflow: hidden;
  background-color: white;
  width:80%;
`
export const LeftContainer = styled.div`
  padding: 10%;
  background-color: #edf0f5;
  width: 50%;
  align-items:center;
  display: flex;
  justify-content: center;
  @media (max-width: 1200px) {
   padding: 8%;
  }
  @media (max-width: 780px) {
   display:none;
  }
`

export const ImageContainer = styled.div`
  width: 100%;
`

export const RightContainer = styled.div`
  padding: 10%;
  width: 50%;
  @media (max-width: 1200px) {
   padding: 5%;
  }
  @media (max-width: 780px) {
   padding: 5% 0;
   width:90%;
  }
`
export const BackContainer = styled.div`
  position: absolute;
  top: 8%;
  left: 5%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 100;
  cursor: pointer;
   @media (max-width: 780px) {
  display:none;
  }
`
