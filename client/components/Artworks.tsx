import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchArtworkImage } from '../actions/artworks'
import { ArtworkApi } from '../../models/external-Artwork'
import LoadingSpinner from './LoadingSpinner'


export default function Home() {
  const { loading, data, error } = useAppSelector((state) => state.artworkState)
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchArtworkImage())
    //dispatch user collections
  }, [dispatch])

  function handleHeartClick() {
    if(isAuthenticated) {
      // heart it will save to collection
    } else {
      loginWithRedirect()
    }
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <LoadingSpinner/>}

      {data?.map((artwork: ArtworkApi) => {
        return (
          <div key={artwork.id}>
            <div>
              <img src={artwork._links?.thumbnail?.href} alt={artwork.slug} />
              <div>{artwork.title}</div>
              <img src='/heart.png' alt='heart-pin' onClick={handleHeartClick}/>
            </div>
          </div>
        )
      })}

    </div>
  )
}
