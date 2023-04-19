import express from 'express'
const router = express.Router()
import { addArtworkToCollection } from '../db/homepage'

router.post('/:id', async (req, res) => {
  try {
    const artworkId = req.params.id
    const { collectionId } = req.body
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
