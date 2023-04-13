import request from 'superagent'
import express from 'express'
const router = express.Router()

// generate xapptoken function
async function generateXappToken() {
  const clientID = '0745ecd351bef5ed821f'
  const clientSecret = '2e6e26b06b1046a7d9784540c0c01639'
  const apiUrl = 'https://api.artsy.net/api/tokens/xapp_token'
  return await request
    .post(apiUrl)
    .send({ client_id: clientID, client_secret: clientSecret })
}

//  GETS api/artworks -- gets X amount of artworks
router.get('/artworks', async (req, res) => {
  try {
    const amount = 10
    const xapp = await generateXappToken()
    const response = await request
      .get(`https://api.artsy.net/api/artworks?size=${amount}`)
      .set('X-Xapp-Token', xapp.body.token)
      .set('Accept', 'application/vnd.artsy-v2+json')
    const artworks = response.body._embedded.artworks
    res.json(artworks)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router
