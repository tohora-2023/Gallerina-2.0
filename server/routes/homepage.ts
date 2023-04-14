import request from 'superagent'
import express from 'express'
import { createCollection, getCollectionTitles } from '../db/artworks'

const router = express.Router()

router.get('/artwork/collection', async (req, res) => {
    const titles = await getCollectionTitles()
    
})


export default router