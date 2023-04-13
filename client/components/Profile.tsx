import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
// import { fetchResults } from
import { useAuth0 } from '@auth0/auth0-react'
import { KeyboardEvent } from 'react'

export default function Profile() {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, user } =
    useAuth0()

  return (
    <>
    <div>
      <h1>{user.name}</h1>
      <div>
        <img className='ring-0' src={user.picture} alt="User" />
      </div>
      </div>
    </>
  )
}
