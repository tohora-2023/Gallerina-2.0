import express from 'express'

import { addUser } from '../db/user'
import { AddUser } from '../../models/profile'
import router from './homepage'
import checkJwt, { JwtRequest } from '../auth0'

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0id = req.auth?.sub
    const username = req.body.username
    const user = { auth0id, username } as AddUser
    await addUser(user)
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(500).json({ err: 'There was an error.' })
  }
})
