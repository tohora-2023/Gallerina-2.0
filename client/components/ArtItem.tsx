import { Link, useParams } from 'react-router-dom'
import CollectionItem from '../../models/CollectionItems'
import { deleteItem } from '../actions/collection-items'
import { useAppDispatch } from '../hooks/hooks'
type Props = CollectionItem
export default function ArtItem(art: Props) {
  const dispatch = useAppDispatch()
  const params = useParams()
  const Collectionid = Number(params.id)
  function handleDelete() {
    dispatch(deleteItem(Collectionid, art.artworkId))
  }
  console.log(art.artworkId)
  console.log(art.artImageLink)
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
      </div>
    </>
  )
}
