import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchCollections } from '../actions/collections'
import { useAuth0 } from '@auth0/auth0-react'
import { ProfileCollection } from '../../models/profile'
import Collection from './Collection'

export default function Profile() {
  const { getAccessTokenSilently, user } = useAuth0()

  const dispatch = useAppDispatch()

  const {
    data: profile,
    error,
    loading,
  } = useAppSelector((state) => state.profileState)

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => dispatch(fetchCollections(user?.id, token)))
      .catch(console.error)
  }, [dispatch])


  return (
    <>
      <div>
        <div className="flex h-full items-center justify-end">
          <button className=" shadow-xs absolute left-10 ml-20 transform cursor-pointer rounded-full border border-black bg-white px-2 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:bg-my-gold hover:shadow-2xl active:translate-y-0 active:shadow-xl">
            Create a curation
          </button>

          <h1 className="text-xl">{`${user?.given_name}'s Curations`}</h1>
          {/* <h2 className="text-lg">User: {}</h2> */}
          <div className="">
            <img
              className="h-30 border-black-200 border-5 ml-10 w-auto rounded-full object-cover object-center"
              src={user?.picture}
              alt="User"
            />
          </div>
        </div>
        <div>
          {loading && <p>Please wait while we load your collections</p>}
          {error && <p>Unfortunately we cannot reach your collections</p>}
          {/* <h3>The Collections for {user?.given_name} will go here</h3> */}
          {profile?.map((profile: ProfileCollection) => (
            <Collection key={profile.collectionId} {...profile} />
          ))}
        </div>
      </div>
    </>
  )
}
