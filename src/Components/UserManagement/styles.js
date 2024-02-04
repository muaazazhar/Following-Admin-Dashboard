import { styled } from 'styled-components'

export const MainContainer = styled.div`
  background-color: white;
  border-radius: 7px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CardTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #282f53;
`

export const LisenceDiv = styled.div`
  border-radius: 100px;
  padding: 0.1rem 0.4rem;
  width: 4rem;
  text-align: center;
  @media (max-width: 1200px) {
    width: 2rem;
    padding: 0.1rem 0.3rem;
  }
  ${props =>
    props.lisenced
      ? `background-color: #BDFED3; color: #01AB3B; border: 1px solid #01AB3B`
      : `background-color: #FFCECF; color: #E94E51; border: 1px solid #E94E51;`}
`
export const StatusDiv = styled.div`
  border-radius: 4px;
  padding: 0.2rem;
  width: 4rem;
  text-align: center;
  color: white;

  ${props =>
    props.status === true
      ? `background-color: #01AB3B; `
      : `background-color: #FFAA46;`}
`

export const CardBody = styled.div`
  margin: 2rem 0;
`

export const TableContainer = styled.div`
  overflow-x: hidden;
  position: relative;
  height: 30rem;
  border-bottom: 1px solid #e9edf4;
  padding: 1rem;
  scrollbar-width: none; /* Hide Firefox scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1200px) {
    overflow-x: auto;
    white-space: nowrap; /* To prevent wrapping of table content */
  }
  .antTable {
    border: none;
    width: 100%;
    position: absolute;
    @media (max-width: 1200px) {
      overflow-x: scroll;
    }
  }
`
export const Text = styled.div`
  width: 5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
export const Desktop = styled.div`
  @media (max-width: 480px) {
    display: none;
  }
`
export const Mobile = styled.div`
  display: none;
  @media (max-width: 480px) {
    display: block;
  }
`

export const CardFooter = styled.div``
