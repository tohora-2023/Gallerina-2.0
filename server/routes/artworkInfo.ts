import express from 'express'
const router = express.Router()
import { addArtworkToCollection } from '../db/homepage'

// add artwork to a collection -- WIP -- later: copy homepage implementation

// need to get api/v1/artworks/:id
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

export default router