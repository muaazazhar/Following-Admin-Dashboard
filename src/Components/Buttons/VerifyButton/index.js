import React from 'react'
import { BtnContainer } from './styles'
import SecondaryButton from '../SecondaryButton'
import PrimaryButton from '../PrimaryButton'
import axios from 'axios'
import { APPROVE_USER } from '../../../utils/API'
import { useNavigate } from 'react-router-dom'

export default function VerifyButton ({ state, email }) {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const approveUser = (email, verification) => {
    axios
      .put(
        APPROVE_USER,
        { email: email, isApproved: verification },
        {
          headers: { token: token }
        }
      )
      .then(function (res) {
        navigate('/users')
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  return (
    <BtnContainer>
      {state ? (
        <SecondaryButton
          text={'Not Verified'}
          isApproved
          onClick={() => approveUser(email, false)}
        />
      ) : (
        <PrimaryButton
          text={'Verify'}
          onClick={() => approveUser(email, true)}
        />
      )}
    </BtnContainer>
  )
}
