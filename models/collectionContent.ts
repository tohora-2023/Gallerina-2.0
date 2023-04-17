export interface CollectionItem {
  artworkId: string
  collectionId: number
  collectionOwnerId: number
  collectionTitle: string
  artTitle: string
  artImageLink: string
  noteName: string
  note: string
  noteDateCreated: string
  noteId: number
}

export interface AddNote {
  noteName: string
  note: string
}

export interface AddCollectionItem extends Partial<CollectionItem> {
  artworkId?: string
}
