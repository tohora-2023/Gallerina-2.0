import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchArtworkImage } from '../actions/artworks'
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
      <div className="flex flex-row flex-wrap justify-evenly">
        {data?.map((artwork: ArtworkApi) => {
          return (
            <div className="max-h-lg max-w-md" key={artwork.id}>
              <div className="basis-1/4 p-2">
                <img
                  className="max-h-md max-w-md"
                  src={artwork._links?.thumbnail?.href}
                  alt={artwork.slug}
                />
                <div>{artwork.title}</div>
                <Dropdown />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
