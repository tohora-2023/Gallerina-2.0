import request from 'superagent'
import express from 'express'
import { ArtworkApi } from '../../models/externalArtwork'
import { ArtworkDatabase, ArtworkSnakeCaseDatabase } from '../../models/artwork'
import { addArtworksToDB, getArtworkById } from '../db/externalArtwork'
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

//  GETS api/v1/artworks -- gets X amount of artworks for Homepage
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

    // for CamelCase implementation on front-end
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

    // replaces imageLink with ${large} + converts to snake
    const artworksSnake = returnedArtworks.map((item) => {
      return {
        id: item.id,
        title: item.title,
        medium: item.medium,
        date: item.date,
        image_link: item.imageLink.replace('{image_version}', 'large'),
        artist_link: item.artistLink
      }
    })
 
  
    await addArtworksToDB(artworksSnake)
  } catch (err) {
    console.log(err)
    res.sendStatus(500).json('an error has occurred')
  }
})

// gets api/v1/artworks/id -- for Art-Info page (also looks at DB)
router.get('/artworks/:id', async (req, res) => {
  try {
    const id = req.params.id
    const snakeArtwork = await getArtworkById(id)
    // checks if artwork is in database, if not, then retrieves it from the API
    if (snakeArtwork && snakeArtwork.length > 0) {
      const artwork = snakeArtwork[0] 
      // CONVERT TO CAMEL CASE TMRW
      res.json(artwork[0])
    } else {
      const xapp = await generateXappToken()
      const response = await request
        .get(`https://api.artsy.net/api/artworks/${id}`)
        .set('X-Xapp-Token', xapp.body.token)
        .set('Accept', 'application/vnd.artsy-v2+json')
      const artwork = response.body._embedded
      res.json(artwork)
    }
  } catch (err) {
    res.sendStatus(500)
  }
})

// gets api/v1/search -- for the Search page
router.get('/search', async (req, res) => {
  try {
    const search = req.query.search
    const xapp = await generateXappToken()
    const response = await request
      .get(`https://api.artsy.net/api/artworks?term=${search}`)
      .set('X-Xapp-Token', xapp.body.token)
      .set('Accept', 'application/vnd.artsy-v2+json')
    const test = response.text.replace(/\\+/g, '')
    const str = test.replace(/'/g, '')
    const body = JSON.parse(str)
    const artworks = body._embedded.artworks
    res.json(artworks)
  } catch (err) {
    res.sendStatus(500)
    console.log('an error ocurred')
  }
})

export default router
