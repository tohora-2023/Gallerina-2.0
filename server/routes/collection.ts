import express from 'express'

import {
  deleteCollectionItemById,
  addNote,
  deleteNote,
  getArtCollectionDBAndNotesById,
} from '../db/collection'

const router = express.Router()

// GET items in collections/:collectionId + also notes!
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const collection = await getArtCollectionDBAndNotesById(id)
    res.json(collection)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// delete item in collections/:id by artId
router.delete('/:id/:artId', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const artId = req.params.artId
    const collection = await deleteCollectionItemById(id, artId)
    res.json(collection)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// ADD NOTE for artId in collection
router.post('/:collectionId/:artId', async (req, res) => {
  try {
    const collectionId = Number(req.params.collectionId)
    const artId = req.params.artId
    const note = req.body
    console.log(note, artId, collectionId)
    const newNote = await addNote(collectionId, note, artId)
    res.json(newNote)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// DELETE NOTE
router.delete('/:collectionId/:artId/:noteId', async (req, res) => {
  try {
    const noteId = Number(req.params.noteId)
    await deleteNote(noteId)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router
