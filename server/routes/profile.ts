import express from 'express'
import {TCollection, TUser } from '../../models/profile'
import {ProfileCollection} from '../../models/profile'
import {
  addCollection,
  deleteCollection,
  getArtCollectionById,
  getCollections,
  updateCollection,
  getUserByAuth,
  getUserInfoAndCollections,
  getCollectionsById,
  geUserInfoAndCollections,
  geUserByAuth,
  geCollectionDBsById,
} from '../db/profile'
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
    const user: TUser = await geUserByAuth(auth0Id)
    const profile = await geUserInfoAndCollections(user.id)
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

// DELETE /api/v1/profile/:CollectionId
// router.delete('/:CollectionId', async (req, res) => {
//   try {
//     const id = Number(req.params.CollectionId)
//     const collections = await deleteCollection(id)
//     res.json(collections)
//   } catch (err) {
//     console.log(err)
//     res.sendStatus(500)
//   }
// })

// DELETE /api/v1/profile/:CollectionId
router.delete('/:CollectionId', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    // const auth0Id = 'google-oauth2|104589919171674569148'
    if (!auth0Id) {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }
    const collectionId = Number(req.params.CollectionId)
    // Get the collection by the collectionId { id, title, cover_img, user_id }
    const userCollection = await geCollectionDBsById(collectionId)
    // if (!auth0Id === collection.user_id)
    if (userCollection[0].auth0id === auth0Id) {
      await deleteCollection(collectionId)
      // If it is, delete and res with status 200
      res.sendStatus(200)
    } else {
      // If it isn't res with status 401 Unauthorized
      return res.status(401).send('Unauthorized')
    }
    // const collections = await deleteCollection(collectionId.)
    // res.json()
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.patch('/:CollectionId', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub

    if (!auth0Id) {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }
    const collectionId = Number(req.params.CollectionId)

    const userCollection = await getCollectionsById(collectionId)

    if (userCollection[0].auth0id === auth0Id) {
      const { title } = req.body
      await updateCollection(collectionId, title)
      res.sendStatus(200)
    } else {
      return res.status(401).send('Unauthorized')
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
