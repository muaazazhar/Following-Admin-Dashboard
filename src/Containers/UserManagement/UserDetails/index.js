import React, { useEffect, useState } from 'react'
import UserDetailsComponent from '../../../Components/UserManagement/UserDetails'
import axios from 'axios'
import {useParams } from 'react-router-dom'
import { GET_USER } from '../../../utils/API'

export default function UserDetailsCotainer () {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const token = localStorage.getItem('token')
  

  const getUser = () => {
    axios
      .get(GET_USER + id, { headers: { token: token } })
      .then(function (res) {
        console.log(res)
        setUser(res.data.data)
      })
  }

  useEffect(() => {
    //getUser()
  }, [id])

  return (
    <React.Fragment>
      <UserDetailsComponent data={user} />
    </React.Fragment>
  )
}
