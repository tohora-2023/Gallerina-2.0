import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchArtworkImage } from '../actions/homepage'
import { ArtworkApi } from '../../models/external-Artwork'
import LoadingSpinner from './LoadingSpinner'
import Dropdown from './Dropdown'

export default function Home() {
  const { loading, data, error } = useAppSelector((state) => state.artworkState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchArtworkImage())
  }, [dispatch])

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <LoadingSpinner />}

      {data?.map((artwork: ArtworkApi) => {
        return (
          <div key={artwork.id}>
            <div>
              <img src={artwork._links?.thumbnail?.href} alt={artwork.slug} />
              <div>{artwork.title}</div>
              <Dropdown />
            </div>
          </div>
        )
      })}
    </div>
  )
}
