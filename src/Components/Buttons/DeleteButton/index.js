import React from 'react'
import { Delete } from './styles'
import axios from 'axios'
import { DELETE_USER } from '../../../utils/API'
import { useNavigate } from 'react-router-dom'

export default function DeleteButton ({ onClick }) {
  return (
    <Delete type='primary' onClick={onClick}>
      Delete
    </Delete>
  )
}
