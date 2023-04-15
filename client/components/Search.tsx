import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ArtworkApi } from '../../models/external-Artwork'
import { getArtworksFromSearch } from '../apis/search'
import LoadingSpinner from './LoadingSpinner'

export default function Search() {
  const [search, setSearch] = useState('')
  const [artworks, setArtworks] = useState<ArtworkApi[] | null>(null)
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function handleSubmit(event: FormEvent) {
    // prevent the default behaviour to make an HTTP request
    event.preventDefault()
    setIsLoading(true)
    getArtworksFromSearch(search)
      .then((response) => {
        setArtworks(response)
        setIsLoading(false)
        setSearch('')
      })
      .catch((err: Error) => {
        setError(true)
      })
  }

  return (
    <div>
      <h1>Search for Artworks</h1>
      <form className="w-1/2 rounded-md" onSubmit={handleSubmit}>
        <input
          type="text"
          className="rounded-md border-4 border-my-gold"
          value={search}
          onChange={handleChange}
        />
      </form>
      {error && <p>An error occurred</p>}
      {loading && <LoadingSpinner />}
      <div className="flex flex-wrap">
        {artworks?.map((art) => {
          return (
            <div key={art.id}>
              <h3>{art.title}</h3>
              <img
                className="m-3 h-80 w-80"
                src={art._links.image.href.replace('{image_version}', 'large')}
                alt={art.slug}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
