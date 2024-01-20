import cors from 'cors'
import express from 'express'
import 'reflect-metadata'
import { AppDataSource } from './database/data-source'

const app = express()

app.use(cors())

app.use(express.json())

AppDataSource.initialize().then(async () => {
  app.listen(3000, () => {
    console.log('server is running')
  })
})
