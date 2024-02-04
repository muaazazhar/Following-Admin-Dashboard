import React from 'react'
import { Back } from './styles'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

export default function BackButton ({ exact }) {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentPage = queryParams.get('page') || 1

  return (
    <Back
      type='secondary'
      onClick={() => navigate(`/users?page=${currentPage}`)}
    >
      <ArrowLeftOutlined />
      Back
    </Back>
  )
}
