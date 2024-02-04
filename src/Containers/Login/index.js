import React, { useState } from 'react'
import LoginComonent from '../../Components/Login'
import { LOGIN } from '../../utils/API'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function LoginContainer () {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const onLogIn = values => {
    axios
      .post(LOGIN, {
        email: values?.email,
        password: values?.password
      })
      .then(function (response) {
        localStorage.setItem('token', response.data?.token)
        navigate('/users')
      })
      .catch(function (error) {
        setError(error.response?.data?.message)
      })
  }

  return <LoginComonent onSubmit={onLogIn} errorMessage={error} />
}
