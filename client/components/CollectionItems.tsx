import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { geCollectionDBItems } from '../actions/collectionItems'
import { useParams } from 'react-router-dom'
import ArtItem from './ArtItem'
import { CollectionItem } from '../../models/collectionContent'

export default function CollectionItems() {
  const {
    loading,
    error,
    data: collectionItems,
  } = useAppSelector((state) => state.collectionItemsState)

  const dispatch = useAppDispatch()
  const params = useParams()
  const id = Number(params.id)

  const collectionDetail: CollectionItem | undefined = collectionItems?.find(
    (art) => art.collectionId === id
  )

  useEffect(() => {
    dispatch(geCollectionDBItems(id))
  }, [dispatch, id])

  return (
    <>
      <div className="h-full w-full">
        <h1 className="p-3 text-3xl font-extrabold">
          {collectionDetail?.collectionTitle}
        </h1>
        <div className="pt-3">
          {loading && <p>Please wait while we load your curation</p>}
          {error && <p>Unfortunately we cannot reach our database</p>}
          <div className="flex flex-wrap">
            {collectionItems?.map((art: CollectionItem) => (
              <ArtItem key={art.artworkId} {...art} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
