import res from '../../models/external'
const request = require('superagent')
import express from 'express'
const router = express.Router()

const clientID = '0745ecd351bef5ed821f'
const clientSecret = '2e6e26b06b1046a7d9784540c0c01639'
const apiUrl = 'https://api.artsy.net/api/tokens/xapp_token'

let xappToken: string

// gets our api token?
router.get('/api', (req, res) => {
  request
    .post(apiUrl)
    .send({ client_id: clientID, client_secret: clientSecret })
    .then((res: any) => {
      xappToken = res.body.token
      res.json({ token: xappToken })
    })
    .catch((err: Error) => {
      res.sendStatus(500)
      console.log(err)
    })
})

export default router
