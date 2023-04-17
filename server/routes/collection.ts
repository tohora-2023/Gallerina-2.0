import express from 'express'

import {
  getArtCollectionById,
  deleteCollectionItemById,
  addNote,
} from '../db/collection'
import { addArtworkToCollection } from '../db/homepage'
const router = express.Router()

// GET items in collections/:id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const collection = await getArtCollectionById(id)
    res.json(collection)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// add artwork to a collection
// api/v1/collections/:id
router.post('/:id', async (req, res) => {
  try {
    const { collectionId, artworkId } = req.body

    const artColl = await addArtworkToCollection(collectionId, artworkId)
    res.json(artColl)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to add the artwork',
    })
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
    const note = req.body // {note: , noteName:}
    console.log(note, artId, collectionId)
    const newNote = await addNote(collectionId, note, artId)
    res.json(newNote)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router
