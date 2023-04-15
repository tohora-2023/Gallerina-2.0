import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { fetchCollections } from '../actions/collections'
// import Collection from '../../models/collection'

export default function Collection() {
  const data = useAppSelector((state) => state.collections)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCollections())
  }, [dispatch])

  console.log(data)

  //export default interface Collection {
  //   id?: number
  //   title: string
  //   coverImg: string
  //   userId: number
  // }

  // if (loading) return <>Loading...</>
  // if (error) return <>An error occurred</>

  return (
    <>
      {/* <div>
        {collections.loading && (
          <p>Please wait while we load your collections</p>
        )}
        {collections.error && <p>Unfortunately we cannot reach our database</p>}
      </div> */}
      {/* {<ul>
        {collections.collections.map((element) => (
          <li key={element.id}>
            <span>{element.title}</span>
          </li>
        ))}
      </ul>
    </> */}

    </>
  )
}