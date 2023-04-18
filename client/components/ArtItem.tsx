import { Link, useParams } from 'react-router-dom'
import { CollectionItem, AddNote } from '../../models/collectionContent'
import { addNoteToArtwork, deleteItem } from '../actions/collectionItems'
import { useAppDispatch } from '../hooks/hooks'
import { FormEvent, ChangeEvent, useState } from 'react'
type Props = CollectionItem
export default function ArtItem(art: Props) {
  const [newNote, setNewNote] = useState({ noteName: '', note: '' } as AddNote)
  const dispatch = useAppDispatch()
  const params = useParams()
  const Collectionid = Number(params.id)

  // DELETE COLLECTION ITEM
  function handleDelete() {
    dispatch(deleteItem(Collectionid, art.artworkId))
  }

  // DELETE NOTE

  // COLLECTION NOTE
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewNote({ note: event.target.value, noteName: event.target.value })
  }

  function handleAddNote(e: FormEvent) {
    e.preventDefault()
    dispatch(addNoteToArtwork(Collectionid, newNote, art.artworkId))
  }

  return (
    <>
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
          <p>{art.note}</p>
        </div>
      </div>
    </>
  )
}
