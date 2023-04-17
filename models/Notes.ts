export interface Note {
  id: number
  noteName: string
  note: string
  collectionId: number
  dateCreated: string
  artId: string
}

export interface AddNote {
  noteName: string
  note: string
}
