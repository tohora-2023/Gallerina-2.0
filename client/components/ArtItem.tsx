import { Link, useParams } from 'react-router-dom'
import { CollectionItem } from '../../models/collectionContent'
import { deleteItem, deleteNoteFromArtwork } from '../actions/collectionItems'
import { useAppDispatch } from '../hooks/hooks'
import { useState } from 'react'
import NewNoteForm from './NewNoteForm'
import { deleteNote } from '../apis/collectionItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'
type Props = CollectionItem

export default function ArtItem(art: Props) {
  // CONDITIONAL FORM RENDER LOGIC
  const [showAddNote, setShowAddNote] = useState(false)

  const dispatch = useAppDispatch()
  const params = useParams()
  const Collectionid = Number(params.id)

  // COLLECTION ITEM
  function handleDelete() {
    dispatch(deleteItem(Collectionid, art.artworkId))
  }

  // NOTE
  function handleDeleteNote() {
    dispatch(deleteNoteFromArtwork(Collectionid, art.noteId))
  }

  return (
    <>
      <NewNoteForm
        onClose={() => setShowAddNote(false)}
        isOpen={showAddNote}
        collectionItem={art}
      />
      <div className="hover:duration-00 group m-3 h-fit w-fit flex-col rounded-md p-2 transition-transform ease-in-out hover:bg-my-gold">
        <img
          className="h-80 w-80 font-quicksand"
          src={art.artImageLink}
          alt={art.artTitle}
        />
        <p className="m-0 w-80 pt-1 font-medium group-hover:text-white">
          {art.artTitle}
        </p>
        <div className="flex justify-between">
          <p onClick={handleDelete}>X</p>

          <Link
            to={`/artworks/${art.artworkId}`}
            className="hidden rounded-full bg-white px-2 text-black group-hover:block"
          >
            View
          </Link>
        </div>
        <div className="mt-3 hidden text-white group-hover:block">
          <FontAwesomeIcon
            icon={faNoteSticky}
            style={{ color: '#ffffff' }}
            onClick={() => setShowAddNote(true)}
          />
          {art.noteName && (
            <div className="flex justify-between">
              <p className="mr-2 font-bold">{art.noteName} </p>
              <p>{art.note}</p>
              <button
                className="rounded-lg bg-white p-1 text-black"
                onClick={handleDeleteNote}
              >
                Delete Note
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
