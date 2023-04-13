import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
// import { fetchResults } from 
import { useAuth0 } from '@auth0/auth0-react'
import { KeyboardEvent } from 'react'


export default function Profile() {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, user } =
  useAuth0()

  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   const getAccess = async () => {
  //     const token = await getAccessTokenSilently()
  //     dispatch(fetchResults(token))
  //   }
  //   getAccess().catch(console.error)
  // }, [dispatch, getAccessTokenSilently])



  return (
    <>
  <h1>{}</h1>
    </>
  )
}