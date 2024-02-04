import { styled } from 'styled-components'
import { Dropdown } from 'antd'
import { Button } from 'antd'

export const AntdDropdown = styled(Dropdown)``

export const MenuButton = styled(Button)`
  width: 30px;
  padding: 0;
  border: none;
  background-color: ${(props) => !props.header ? `#f2f2f3` : ``};
  box-shadow: 0 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
