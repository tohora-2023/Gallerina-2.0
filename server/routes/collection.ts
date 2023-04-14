import express from 'express'
import Collection from '../../models/collection'

import {
  addCollection,
  deleteCollection,
  getArtCollectionById,
  getCollections,
} from '../db/collection'
const router = express.Router()
export default router

// GET all Collections
router.get('/', async (req, res) => {
  try {
    const collections = await getCollections()
    res.json(collections)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// ADD collection
router.post('/', async (req, res) => {
  try {
    const newCollection: Collection = req.body
    const collection = await addCollection(newCollection)
    res.json(collection)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// DELETE collection/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const collection = await deleteCollection(id)
    res.json(collection)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// GET collection/:id
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
