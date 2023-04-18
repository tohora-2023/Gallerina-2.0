export interface ProfileCollection {
  collectionId: number
  collectionCoverImg: string
  userId: number
  title: string
  username: string
  auth0id: string
}

export interface TCollection {
  id: number
  title: string
  cover_img: string
  user_id: number
}

export interface TUser {
  id: number
  auth0id: string
  username: string
}

export type AddCollection = Partial<Omit<TCollection, 'id'>>
export type CollectionTitle = Partial<Omit<TCollection, 'coverImg' | 'userId'>>
