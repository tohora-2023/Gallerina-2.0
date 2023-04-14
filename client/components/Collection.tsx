import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { Link } from 'react-router-dom'
import TCollection from '../../models/collection'
import { useAuth0 } from '@auth0/auth0-react'

type Props = TCollection
export default function Collection(collection: Props) {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, user } =
    useAuth0()
  return (
    <>
      <div className="flex justify-center p-1">
        <div>
          <Link to={`/profile/collections/${collection.id}`}>
            {collection.title} redirects to /collections{collection.id} for
            user:{collection.user_id}
          </Link>
          <br />
          <img
            src={collection.cover_img}
            alt={`cover for ${collection.title}`}
          />
        </div>
      </div>
    </>
  )
}