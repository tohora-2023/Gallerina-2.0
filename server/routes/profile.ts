import express from 'express'
import { TCollection, TUser } from '../../models/profile'

import {
  addCollection,
  deleteCollection,
  getArtCollectionAndNotesById,
  getCollections,
  getUserByAuth,
  getUserInfoAndCollections,
} from '../db/collection'
import checkJwt, { JwtRequest } from '../auth0'
const router = express.Router()
export default router

// GET api/v1/profile  -- AKA profile information
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (!auth0Id) {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }
    const user: TUser = await getUserByAuth(auth0Id)
    const profile = await getUserInfoAndCollections(user.id)
    res.json(profile)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// api/v1/profile
// create an empty collection
router.post('/', async (req, res) => {
  try {
    const newCollection: TCollection = req.body
    const collection = await addCollection(newCollection)
    res.json(collection)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// DELETE profile/collection/:id
router.delete('collection/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const collection = await deleteCollection(id)
    res.json(collection)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
