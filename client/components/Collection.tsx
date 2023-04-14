import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchCollections } from '../actions/collections'
import { Link } from 'react-router-dom'

export default function Collection() {
  const collections = useAppSelector((state) => state.collections)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCollections())
  }, [dispatch])
  console.log('Reaching the collection.tsx component')
  return (
    <>
      <div>
        <h3>Here is the collection page</h3>
        {collections.loading && (
          <p>Please wait while we load your collections</p>
        )}
        {collections.error && <p>Unfortunately we cannot reach our database</p>}
      </div>
    </>
  )
}
