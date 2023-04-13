import { Router } from 'express'
import { getAllArt } from '../db/artworks'
const router = Router()

router.get('/', async (req, res) => {
  try {
    const artworks = await getAllArt()
    res.json(artworks)
  } catch (e) {
    res.sendStatus(500).json({ error: 'Please try again' })
  }
})

export default router