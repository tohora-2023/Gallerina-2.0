import express from 'express'
import { join } from 'node:path'

import external from './routes/external'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/artworks', external)
server.use('/api/v1/', external)

server.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))
})


export default server
