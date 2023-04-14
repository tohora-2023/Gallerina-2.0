import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchCollections } from '../actions/collections'

export default function Collection() {
  const collections = useAppSelector((state) => state.collections)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCollections())
  }, [dispatch])
  console.log(collections)
  return (
    <>
      <div>
        {collections.loading && (
          <p>Please wait while we load your collections</p>
        )}
        {collections.error && <p>Unfortunately we cannot reach our database</p>}
      </div>
      <div>{collections.map((collection) => (
        <li key={collection.id}>) 
      }</div>
    </>
  )
}
