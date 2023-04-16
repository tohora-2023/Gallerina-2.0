export default interface TCollection {
  id: number
  title: string
  cover_img: string
  user_id: number
}

export type AddCollection = Partial<Omit<TCollection, 'id'>>

export type CollectionTitle = Partial<Omit<TCollection, 'coverImg' | 'userId'>>
