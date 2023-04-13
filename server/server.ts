import express from 'express'
import { join } from 'node:path'

import artworksRoutes from './routes/artworks'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/artworks', artworksRoutes)

export default server
