import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { Link } from 'react-router-dom'
import { ProfileCollection } from '../../models/profile'
import { useAuth0 } from '@auth0/auth0-react'

type Props = ProfileCollection
export default function Collection(profile: Props) {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, user } =
    useAuth0()
  return (
    <>
      <div className="flex justify-center p-1">
        <div>
          <Link to={`/collections/${profile.collectionId}`}>
            {profile.title}
          </Link>
          <br />
          <img
            src={profile.collectionCoverImg}
            alt={`cover for ${profile.title}`}
          />
        </div>
      </div>
    </>
  )
}
