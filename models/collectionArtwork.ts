export interface ArtworkCollection {
  collectionId?: number
  artworkId?: number
}

export interface CollectionDB {
  id: number
  title: string
  coverImg: string
  userId: number
}

export type AddCollection = Partial<Omit<CollectionDB, 'id'>>
export type CollectionTitle = Partial<Omit<CollectionDB, 'coverImg' | 'userId'>>
