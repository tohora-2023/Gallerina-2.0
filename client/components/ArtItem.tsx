import CollectionItem from '../../models/CollectionItems'
type Props = CollectionItem
export default function ArtItem(art: Props) {
  // const [isEditing, setIsEditing] = useState(false)
  // function handleDelete() {
  //   dispatch(deleteItem(collectionItem.id))
  // }
  // handleDblClick(){}
  return (
    <>
      <div>
        <img src={art.artImageLink} alt={art.artTitle} />
        <p>{art.artTitle}</p>
        <button></button>
      </div>
    </>
  )
}
