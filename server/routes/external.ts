import request from 'superagent'
import express from 'express'
import { ArtworkApi } from '../../models/externalArtwork'
import { ArtworkDatabase, ArtworkSnakeCaseDatabase } from '../../models/artwork'
import { addArtworksToDB, getArtworkById } from '../db/externalArtwork'
const router = express.Router()

async function generateXappToken() {
  const clientID = '0745ecd351bef5ed821f'
  const clientSecret = '2e6e26b06b1046a7d9784540c0c01639'
  const apiUrl = 'https://api.artsy.net/api/tokens/xapp_token'
  return await request
    .post(apiUrl)
    .send({ client_id: clientID, client_secret: clientSecret })
}

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

    const artworksSnake = returnedArtworks.map((item) => {
      return {
        id: item.id,
        title: item.title,
        medium: item.medium,
        date: item.date,
        image_link: item.imageLink.replace('{image_version}', 'large'),
        artist_link: item.artistLink,
      }
    })

    await addArtworksToDB(artworksSnake)
  } catch (err) {
    console.log(err)
    res.sendStatus(500).json('an error has occurred')
  }
})

router.get('/artworks/:id', async (req, res) => {
  try {
    const id = req.params.id
    const snakeArtwork = await getArtworkById(id)
   
    if (snakeArtwork && snakeArtwork.length > 0) {
      const artwork: ArtworkSnakeCaseDatabase = snakeArtwork[0]
      const camelArtwork = {
        id: artwork.id,
        title: artwork.title,
        medium: artwork.medium,
        date: artwork.date,
        imageLink: artwork.image_link,
        artistLink: artwork.artist_link,
      }
      res.json(camelArtwork)
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
