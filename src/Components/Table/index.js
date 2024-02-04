import React from 'react'
import { AntTable } from './styles'

export default function index ({ columns, dataSource }) {
  return <AntTable columns={columns} dataSource={dataSource} />
}
