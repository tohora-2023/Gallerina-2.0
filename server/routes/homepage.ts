import express from 'express'
import { geCollectionDBsByUserId, addArtworkToCollection, addNewCollection } from '../db/homepage'
import checkJwt from '../auth0'
import { JwtRequest } from '../auth0'

const router = express.Router()

// GETS user collections for dropdown in homepage
router.get('/user/collections', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (!auth0Id) {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }

    const collections = await geCollectionDBsByUserId(auth0Id)
    res.json(collections)
  } catch (error) {
    res.status(500).json({
      error: "There was an error trying to get this user's collections",
    })
  }
})

// ADD an artwork to artworks_collections for a user
router.post('/user/collections', async (req, res) => {
  try {
    const { collectionId, artworkId } = req.body

    if (!req.body) {
      res.status(400).json({ error: 'New Art_Coll was invalid' })
    }

    const artColl = await addArtworkToCollection(collectionId, artworkId)
    res.json(artColl)
  } catch (error) {
    res.status(500).json({
      error: 'There was an error trying to add the artwork',
    })
  }
})

// ADD a new collection for a user
router.post('/user/add-collection', async (req, res) => {
  try{
    const collection = req.body
    console.log(req.body)
    if (!collection) {
      res.status(400).json({ error: 'New collection was invalid' })
    }
  
    const newCollection = await addNewCollection(collection)
    console.log(newCollection)
    res.json(newCollection)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to add a new collection',
    })
  }
})

export default router
