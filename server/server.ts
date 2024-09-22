import * as Path from 'node:path'
import express from 'express'
import cors, { CorsOptions } from 'cors'
import dotenv from 'dotenv'
import request from 'superagent'

dotenv.config() // Load environment variables

const server = express()

server.use(express.json())
server.use(cors('*' as CorsOptions))

// Route for fetching product data (with server-side auth)
server.get('/api/v1/product/:id', async (req, res) => {
  const productId = req.params.id
  const user = process.env.USERNAME
  const pass = process.env.PASS

  try {
    const response = await request
      .get(
        `https://nartastaging.retailpath.com.au/cgi-bin/WebObjects/NARTAStaging.woa/ra/Product/${productId}`,
      )
      .auth(user!, pass!) // Use server-side credentials

    console.log(response.body)

    if (!response.body) {
      return res.status(404).send('Product not found')
    }

    res.json(response.body) // Send the data to the client
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).send('Failed to fetch product')
  }
})

// Handle production assets
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
