import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchArtworkImage } from '../actions/homepage'
import { ArtworkApi } from '../../models/externalArtwork'
import LoadingSpinner from './LoadingSpinner'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'
import { CollectionDB } from '../../models/collectionArtwork'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllCollectionsApi } from '../apis/homepage'

export default function Home() {
  const { loading, data, error } = useAppSelector((state) => state.artworkState)
  const [ collections, setCollections ] = useState<CollectionDB[]>([])
  const { user } = useAuth0()
  const { getAccessTokenSilently } = useAuth0()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchArtworkImage())
  }, [dispatch])

  useEffect(() => {
    const getAccess = async () => {
      const token = await getAccessTokenSilently()
      if (user) {
        getAllCollectionsApi(token)
          .then((collections: CollectionDB[]) => {
            setCollections(collections)
          })
          .catch((error: Error) => {
            console.log(error)
          })
      }
    }
    getAccess().catch(console.error)
  }, [user, getAccessTokenSilently])

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <LoadingSpinner />}
      <div className="columns-4 gap-x-12 space-y-12 2xl:columns-5">
        {data?.map((artwork: ArtworkApi) => {
          return (
            <div key={artwork.id} className="">
              <div className="relative break-inside-avoid-column">
                <img
                  className="h-auto w-full rounded-md opacity-100 hover:opacity-80"
                  src={artwork._links?.thumbnail?.href}
                  alt={artwork.slug}
                />
                <div className="text-center font-garamond text-sm font-bold text-black">
                  <Dropdown artwork={artwork} coverImg={artwork._links?.thumbnail?.href} collections={collections} setCollections={setCollections} />
                  <Link to={`/artworks/${artwork.id}`}>{artwork.title}</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
