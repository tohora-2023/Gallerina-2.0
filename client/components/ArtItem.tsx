import { Link, useParams } from 'react-router-dom'
import { CollectionItem } from '../../models/collectionContent'
import { deleteItem, deleteNoteFromArtwork } from '../actions/collectionItems'
import { useAppDispatch } from '../hooks/hooks'
import { useState } from 'react'
import NewNoteForm from './NewNoteForm'
import { deleteNote } from '../apis/collectionItems'
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
      <div className="group m-3 h-fit w-fit flex-col rounded-md p-2 transition-transform ease-in-out hover:scale-105 hover:bg-my-gold hover:duration-500">
        <img
          className="h-80 w-80 font-quicksand"
          src={art.artImageLink}
          alt={art.artTitle}
        />
        <p className="m-0 w-80 pt-1 font-medium group-hover:text-white">
          {art.artTitle}
        </p>
        <div className="flex justify-between">
          <button
            className="hidden rounded-full bg-white px-2 text-rose-500 group-hover:block"
            onClick={handleDelete}
          >
            X
          </button>
          <Link
            to={`/artworks/${art.artworkId}`}
            className="hidden rounded-full bg-white px-2 text-black group-hover:block"
          >
            View
          </Link>
        </div>
        <div className="mt-3 hidden text-white group-hover:block">
          <button
            onClick={() => setShowAddNote(true)}
            className="mt-2 rounded-lg bg-white p-1 text-black group-hover:block"
          >
            Add Note
          </button>
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
