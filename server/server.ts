import express from 'express'
import { join } from 'node:path'

import homeRoutes from './routes/home'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/home', homeRoutes)

export default server
