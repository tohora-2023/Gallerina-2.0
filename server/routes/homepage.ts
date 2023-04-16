import express from 'express'
import { getCollectionsByUserId, addArtworkToCollection } from '../db/homepage'
import { ArtworkCollection } from '../../models/collection-artwork'
// import checkJwt from '../auth0'
// import { JwtRequest } from '../auth0'

const router = express.Router()

// GETS user collections for dropdown in homepage
router.get('/user/collections', async (req, res) => {
  try {
    const auth0Id = 'bsd24gyg55w56dd7a' // refactor so that it checks user's auth0id

    if (!auth0Id) {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    }

    const collections = await getCollectionsByUserId(auth0Id)
    res.json(collections)
  } catch (error) {
    console.log(error)
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
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to add the artwork',
    })
  }
})

export default router
