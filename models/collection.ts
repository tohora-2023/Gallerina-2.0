export default interface Collection {
  id: number
  title: string
  cover_img?: string
  user_id: 1
}

export type AddCollection = Partial<Omit<Collection, 'id'>>
