import { Link, useParams } from 'react-router-dom'
import { CollectionItem } from '../../models/collectionContent'
import { deleteItem, deleteNoteFromArtwork } from '../actions/collectionItems'
import { useAppDispatch } from '../hooks/hooks'
import { useState } from 'react'
import NewNoteForm from './NewNoteForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileCircleXmark,
  faTrash,
  faFile,
  faEye,
} from '@fortawesome/free-solid-svg-icons'
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
        <div className="flex w-full justify-between">
          <div className="flex ">
            <button onClick={handleDelete}>
              {' '}
              <FontAwesomeIcon icon={faTrash} style={{ color: '#ffffff' }} />
            </button>
            <Link
              to={`/artworks/${art.artworkId}`}
              className="ml-2 hidden group-hover:block"
            >
              <FontAwesomeIcon icon={faEye} style={{ color: '#ffffff' }} />
            </Link>
          </div>
          <div className="flex">
            <button onClick={() => setShowAddNote(true)} className="mr-2">
              <FontAwesomeIcon icon={faFile} style={{ color: '#ffffff' }} />
            </button>
            <button onClick={handleDeleteNote}>
              <FontAwesomeIcon
                icon={faFileCircleXmark}
                style={{ color: '#ffffff' }}
              />
            </button>
          </div>
        </div>
        <div className="hidden group-hover:block">
          {art.noteName && (
            <div className="flex justify-between">
              <p className="mr-2 font-bold">{art.noteName} </p>
              <p>{art.note}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
