import { styled } from 'styled-components'
import { Table } from 'antd'

export const AntTable = styled(Table)`
  .ant-table {
    border-radius: 0px !important;
    ::-webkit-scrollbar{
       display: none;
     }
  }
  .ant-table-container {
    border-radius: 0px !important;
  }
  .ant-table-content > table {
    border-radius: 0px !important;
  }

  .ant-table-cell,
  .ant-table-cell-fix-left {
    background-color: white !important;
    border-radius: 0px !important;
    font-size: .8rem;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    @media (max-width: 1400px) {
      font-size: 12px;
    }
  }
  thead tr th {
    border-top: 1px solid #f0f0f0; // Add your desired border style here

    &::before {
      display: none; // Remove the ::before pseudo-element
    }
  }
  .ant-table-tbody > tr > td {
    border: none !important;
  }
`
