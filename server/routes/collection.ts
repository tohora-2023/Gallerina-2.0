import express from 'express'
import { getCollections } from '../db/collection'
const router = express.Router()
export default router

router.get('/', async (req, res) => {
  try {
    const collections = await getCollections()
    res.json(collections)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
