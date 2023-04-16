export default interface Collection {
  id?: number 
  title: string
  coverImg: string
  userId: number
}

export type AddCollection = Partial<Omit<Collection, 'id'>>

export type CollectionTitle = Partial<Omit<Collection, 'coverImg' | 'userId' >>