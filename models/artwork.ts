export interface Artwork {
    id?: number
    title?: string
    artist?: string
    date?: string
    category?: string
    image?: string
    collecting_institution?: string

  }
  
  export type Artworks = Artwork[]