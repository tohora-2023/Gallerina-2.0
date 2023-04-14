import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchCollectionItems } from '../actions/collection-items'
import { useParams } from 'react-router-dom'
import ArtItem from './ArtItem'
import CollectionItem from '../../models/CollectionItems'

export default function CollectionItems() {
  const {
    loading,
    error,
    data: collectionItems,
  } = useAppSelector((state) => state.collectionItemsState)

  const dispatch = useAppDispatch()
  const params = useParams()
  const id = Number(params.id)
  console.log('from useAppSelector', collectionItems)
  console.log('error', error)
  console.log(`params ID in collectionItems`, id)
  useEffect(() => {
    dispatch(fetchCollectionItems(id))
  }, [dispatch, id])
  console.log()
  return (
    <>
      {/* <h3>{collectionItems.collectionTitle}</h3> */}
      <h3>Here is the collection page</h3>
      <div>
        {loading && <p>Please wait while we load your collections</p>}
        {error && <p>Unfortunately we cannot reach our database</p>}
        <div>
          {collectionItems.map((art: CollectionItem) => (
            <ArtItem key={art.collectionId} {...art} />
          ))}
        </div>
      </div>
    </>
  )
}
