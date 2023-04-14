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
        <div className="flex h-full items-center justify-end">
          <button className="shadow-xs absolute left-0 ml-20 transform cursor-pointer rounded-full border border-black bg-white px-2 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:bg-my-gold hover:shadow-2xl active:translate-y-0 active:shadow-xl">
            Create a curation
          </button>

          <h1 className="text-xl">{user.given_name}'s Curations</h1>
          <div className="">
            <img
              className="h-30 border-black-200 border-5 ml-10 w-auto rounded-full object-cover object-center"
              src={user.picture}
              alt="User"
            />
          </div>
        </div>
        <div>
          {/* <div
          // onClick={}
          className="border-black-200 bg-white-200 mt-10 flex h-64 flex-col items-center justify-center rounded-2xl border"
        >
          <div className="flex items-center"></div> */}
        </div>
      </div>
    </>
  )
}
