import express from 'express'
import { getCollectionsByUserId } from '../db/homepage'
// import checkJwt from '../auth0'
// import { JwtRequest } from '../auth0'

const router = express.Router()

router.get('/user/collections', async (req, res) => {
  const auth0Id = 'bsd24gyg55w56dd7a'

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  const collections = await getCollectionsByUserId(auth0Id)
  // console.log(collections)
  res.json(collections)
})

export default router
