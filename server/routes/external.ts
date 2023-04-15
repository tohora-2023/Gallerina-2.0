import request from 'superagent'
import express from 'express'
import { ArtworkApi } from '../../models/external-Artwork'
import { ArtworkDatabase } from '../../models/artwork'
import { addArtworkToDB } from '../db/artwork-info'
import { getArtworkById } from '../db/artworks'
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
    const amount = 100
    const xapp = await generateXappToken()
    const response = await request
      .get(`https://api.artsy.net/api/artworks?size=${amount}`)
      .set('X-Xapp-Token', xapp.body.token)
      .set('Accept', 'application/vnd.artsy-v2+json')
    const artworks = response.body._embedded.artworks
    res.json(artworks)
    const returnedArtworks: ArtworkDatabase[] = artworks.map(
      (artwork: ArtworkApi) => ({
        id: artwork.id,
        title: artwork.title,
        artistLink: artwork._links.artists.href,
        medium: artwork.medium,
        date: artwork.date,
        imageLink: artwork._links.image.href,
      })
    )
    // replaces imageLink with ${large}
    const artworksToInsert = returnedArtworks.map((item) => {
      return {
        ...item,
        imageLink: item.imageLink.replace('{image_version}', 'large'),
      }
    })

    await addArtworkToDB(artworksToInsert)
  } catch (err) {
    console.log(err)
    res.sendStatus(500).json('an error has occurred')
  }
})

router.get(`/artworks/:id`, async (req, res) => {
  try {
    const id = req.params.id
    const artwork = await getArtworkById(id)
    // checks if artwork is in database, if not, then retrieves it from the API
    if (artwork && artwork.length > 0) {
      res.json(artwork[0])
    } else {
      const xapp = await generateXappToken()
      const response = await request
        .get(`https://api.artsy.net/api/artworks/${id}`)
        .set('X-Xapp-Token', xapp.body.token)
        .set('Accept', 'application/vnd.artsy-v2+json')
      const artwork = response.body
      res.json(artwork)
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router
