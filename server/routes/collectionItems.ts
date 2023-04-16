import express from 'express'

import {
  getArtCollectionById,
  deleteCollectionItemById,
} from '../db/collection'
const router = express.Router()

// GET items in collection/:id
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

// delete item in collection/:id by artId
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
export default router
