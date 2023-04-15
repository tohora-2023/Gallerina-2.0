import { useEffect } from 'react'
import { Link, Route, RouteProps } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
// import { fetchResults } from
import { fetchCollections } from '../actions/collections'
import { useAuth0 } from '@auth0/auth0-react'
import { KeyboardEvent } from 'react'
import Collection from './Collection'
import TCollection from '../../models/collection'

// TYPE FOR THE PROPS IN THE ROUTER

export default function Profile() {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, user } =
    useAuth0()
  const dispatch = useAppDispatch()

  const {
    data: collections,
    error,
    loading,
  } = useAppSelector((state) => state.collectionState)

  useEffect(() => {
    dispatch(fetchCollections())
  }, [dispatch])

  return (
    <><div>
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
      {/* <div>
        <div className="flex h-full items-center justify-end">
          <h1 className="text-xl">{`${user?.given_name}'s Curation`}</h1>
          <div className="">
            <img
              className="h-30 border-black-200 border-5 ml-10 w-auto rounded-full object-cover object-center"
              src={user?.picture}
              alt="User"
            />
          </div>
        </div>
        <div
          // onClick={}
          className="border-black-200 bg-white-200 mt-10 flex h-64 flex-col items-center justify-center rounded-2xl border"
        >
          <img className="mt-4 h-10" src="/curation.svg" alt="add" />
          <div className="flex items-center">Create a curation</div> */}
        </div>
        <div>
        {loading && <p>Please wait while we load your collections</p>}
        {error && <p>Unfortunately we cannot reach our database</p>}
        {/* <h3>The Collections for {user?.given_name} will go here</h3> */}
        {collections?.map((collection: TCollection) => (
          <Collection key={collection.id} {...collection} />
        ))}
        </div>
      </div>
    </>
  )
}
