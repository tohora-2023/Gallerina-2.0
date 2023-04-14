export default interface CollectionItems {
  artworkId: string
  collectionId: number
  collectionOwnerId: number
  collectionTitle: string
  artTitle: string
  artImageLink: string
}

export interface AddCollectionItems {
  artworkId: string
  collectionId: number
}
