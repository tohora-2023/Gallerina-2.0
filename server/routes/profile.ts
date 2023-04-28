import express from 'express'
import { TUser } from '../../models/profile'
import {
  addCollection,
  deleteCollection,
  updateCollection,
  getCollectionsById,
  getUserInfoAndCollections,
  getUserByAuth,
  getCollectionDBsById,
} from '../db/profile'
import checkJwt, { JwtRequest } from '../auth0'
const router = express.Router()
export default router

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

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub

    if (!auth0Id) {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }
    const user = await getUserByAuth(auth0Id)

    const newCollection = {
      title: req.body.title,
      user_id: user.id,
      cover_img: '/placeholder-image.png',
    }

    await addCollection(newCollection)

    const profile = await getUserInfoAndCollections(user.id)
    res.json(profile)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.delete('/:CollectionId', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (!auth0Id) {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }
    const collectionId = Number(req.params.CollectionId)
    // Get the collection by the collectionId { id, title, cover_img, user_id }
    const userCollection = await getCollectionDBsById(collectionId)
    // if (!auth0Id === collection.user_id)
    if (userCollection[0].auth0id === auth0Id) {
      await deleteCollection(collectionId)
      // If it is, delete and res with status 200
      res.sendStatus(200)
    } else {
      // If it isn't res with status 401 Unauthorized
      return res.status(401).send('Unauthorized')
    }
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
