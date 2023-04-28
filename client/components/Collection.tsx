import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { useAppDispatch } from '../hooks/hooks'
import { Link } from 'react-router-dom'
import { ProfileCollection } from '../../models/profile'
import { updateCollection } from '../actions/collections'
import Delete from './DeleteModal'

type Props = ProfileCollection

export default function Collection(profile: Props) {
  const { getAccessTokenSilently } = useAuth0()

  const [amendTitle, setAmendTitle] = useState(profile.title)

  const dispatch = useAppDispatch()

  const [showForm, setShowForm] = useState(false)

  const [showDelete, setShowDelete] = useState(false)

  const handleUpdateClick = async () => {
    setShowForm(true)
  }

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const token = await getAccessTokenSilently()
    dispatch(updateCollection(profile.collectionId, amendTitle, token))
    setShowForm(false)
  }

  return (
    <>
      <Delete
        onClose={() => setShowDelete(false)}
        isOpen={showDelete}
        profile={profile}
      />
      <div className="mt-10 mb-10 flex justify-center">
        <div className="shadow-xs border-grey w-full transform cursor-pointer rounded-lg border bg-white text-center font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:bg-my-gold hover:text-white hover:shadow-2xl active:translate-y-0 active:shadow-xl">
          <div className="grid grid-cols-2 items-center gap-4 pt-10 pb-10">
            <Link to={`/collections/${profile.collectionId}`}>
              <img
                className="self-align-left mx-auto h-full rounded-md"
                src={profile.collectionCoverImg}
                alt={`cover for ${profile.title}`}
              />
            </Link>
            <div className="mb-10 self-center text-3xl hover:text-white">
              <Link to={`/collections/${profile.collectionId}`}>
                {profile.title}
              </Link>
              <div className="mt-10 flex justify-center text-base">
                <button
                  onClick={() => setShowDelete(true)}
                  className="shadow-xs mx-2 mb-2 transform cursor-pointer rounded-full border border-black bg-white px-2 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:shadow-2xl active:translate-y-0 active:shadow-xl"
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
                <button
                  onClick={handleUpdateClick}
                  className="shadow-xs z-10 mx-2 mb-2 transform cursor-pointer rounded-full border border-black bg-white px-2 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:shadow-2xl active:translate-y-0 active:shadow-xl"
                >
                  <FontAwesomeIcon icon={faPen} /> Rename
                </button>
              </div>
            </div>
          </div>

          {showForm && (
            <form onSubmit={handleUpdateSubmit} className="mt-4">
              <div className="mb-4 flex flex-col">
                <label htmlFor="name" className="mb-2 text-center font-bold">
                  New Collection Name:
                </label>
                <input
                  maxLength={40}
                  type="text"
                  name="name"
                  id="name"
                  className="text-grey-darkest rounded border border-my-gold py-2 px-3 text-black hover:text-black focus:outline-my-gold"
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
