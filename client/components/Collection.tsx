import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { Link } from 'react-router-dom'
import ProfileCollection from '../../models/profile'
import { useAuth0 } from '@auth0/auth0-react'
import { deleteCollection, updateCollection } from '../actions/collections'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

type Props = ProfileCollection

export default function Collection(profile: Props) {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, user } =
    useAuth0()

  const [amendTitle, setAmendTitle] = useState(profile.title)

  const dispatch = useAppDispatch()

  const [showForm, setShowForm] = useState(false) // Add state variable

  const handleDeleteClick = async () => {
    const token = await getAccessTokenSilently()
    dispatch(deleteCollection(profile.collectionId, token))
  }

  const handleUpdateClick = async () => {
    setShowForm(true) // Display the form when the button is clicked
  }

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const token = await getAccessTokenSilently()
    dispatch(updateCollection(profile.collectionId, amendTitle, token))
    setShowForm(false)
  }


  return (
    <>
      <div className="flex justify-center p-1">
        <div>
          <Link to={`/collections/${profile.collectionId}`}>
            {profile.title}
          </Link>
          <br />
          <img
            src={profile.collectionCoverImg}
            alt={`cover for ${profile.title}`}
          />
          <div className="mt-2 flex justify-center">
            <button className="shadow-xs mx-2 transform cursor-pointer rounded-full border border-black bg-white px-2 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:bg-my-gold hover:shadow-2xl active:translate-y-0 active:shadow-xl">
              <FontAwesomeIcon icon={faTrash} onClick={handleDeleteClick} />
            </button>
            <button className="shadow-xs mx-2 transform cursor-pointer rounded-full border border-black bg-white px-2 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:bg-my-gold hover:shadow-2xl active:translate-y-0 active:shadow-xl">
              <FontAwesomeIcon icon={faPen} onClick={handleUpdateClick} />
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleUpdateSubmit} className="mt-4">
              <div className="mb-4 flex flex-col">
                <label htmlFor="name" className="mb-2 text-center font-bold">
                  New Collection Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="text-grey-darkest border py-2 px-3"
                  value={amendTitle}
                  required
                  onChange={(e) => setAmendTitle(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="shadow-xs mx-2 transform cursor-pointer rounded-full border border-black bg-white px-2 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:bg-my-gold hover:shadow-2xl active:translate-y-0 active:shadow-xl"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="shadow-xs mx-2 transform cursor-pointer rounded-full border border-black bg-white px-2 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:bg-my-gold hover:shadow-2xl active:translate-y-0 active:shadow-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
