export default interface CollectionItems {
  artworkId: string
  collectionId: number
  collectionOwnerId: number
  collectionTitle: string
  artTitle: string
  artImageLink: string
}

export interface AddCollectionItem extends Partial<CollectionItems> {
  artworkId?: string
}
