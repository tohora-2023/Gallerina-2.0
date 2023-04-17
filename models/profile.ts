export interface ProfileCollection {
  collectionId: number
  collectionCoverImg: string
  userId: number
  title: string
  username: string
  auth0id: string
}

export interface User {
  id: number
  auth0id: string
  username: string
}

