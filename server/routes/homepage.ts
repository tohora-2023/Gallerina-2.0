import express from 'express'
import { getCollectionsByUserId } from '../db/artworks'
import checkJwt from '../auth0'
import { JwtRequest } from '../auth0'

const router = express.Router()

router.get('/user/collections', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  const collections = await getCollectionsByUserId(auth0Id)
  res.json(collections)
})

export default router
