import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { Link } from 'react-router-dom'
import ProfileCollection from '../../models/profile'
import { useAuth0 } from '@auth0/auth0-react'
import { deleteCollection, updateCollection } from '../actions/collections'
import { useState } from 'react'

type Props = ProfileCollection
export default function Collection(profile: Props) {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, user } =
    useAuth0()

  const [amendTitle, setAmendTitle] = useState<ProfileCollection>()

  const dispatch = useAppDispatch()

  const [showForm, setShowForm] = useState(false) // Add state variable

  const handleDeleteClick = async () => {
    const token = await getAccessTokenSilently()
    dispatch(deleteCollection(profile.collectionId, token))
  }

  const handleUpdateClick = async () => {
    setShowForm(true) // Display the form when the button is clicked
  }

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {}

  console.log(profile)

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
          <button className=" shadow-xs absolute left-10 ml-20 transform cursor-pointer rounded-full border border-black bg-white px-2 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:bg-my-gold hover:shadow-2xl active:translate-y-0 active:shadow-xl">
            <FontAwesomeIcon icon={faTrash} />
          </button>

          <br></br>
          <button
            className=" shadow-xs absolute left-10 ml-20 transform cursor-pointer rounded-full border border-black bg-white px-2 py-0.5 font-bold tracking-wide text-black transition duration-200 hover:-translate-y-1 hover:bg-my-gold hover:shadow-2xl active:translate-y-0 active:shadow-xl"
            onClick={handleUpdateClick}
          >
            Update Name
          </button>

          {showForm && (
            <form onSubmit={handleUpdateSubmit}>
              <label>
                New Collection Name:
                <input type="text" name="name" />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
