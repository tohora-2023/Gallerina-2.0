import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ArtworkApi } from '../../models/external-Artwork'
import { getArtworksFromSearch } from '../apis/search'
import LoadingSpinner from './LoadingSpinner'

export default function Search(art: ArtworkApi[]) {
  const [artworks, setArtworks] = useState<ArtworkApi[] | null>
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    await getArtworksFromSearch()
      .then((response) => {
        setArtworks(response: ArtWorkApi[])
      })
      .finally(() => {
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(error)
        setError(true)
      })
  }, [])

  const [text, setText] = useState('')

  function handleChange(event: ChangeEvent) {
    setText(event.target.value)
  }

  function handleSubmit(event: FormEvent) {
    // prevent the default behaviour to make an HTTP request
    event.preventDefault()

    console.log('Submitted text: ', text)
  }

  return (
    <div>
      {error && <p>An error occurred</p>}
      {loading && <LoadingSpinner />}
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleChange} />
      </form>
    </div>
  )
}
