import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import routers from './app/routes/routes'
import { AppDataSource } from './database/data-source'

const app = express()

app.use(cors())

app.use(express.json())

app.use(routers)

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
      return response.status(400).json({
        parameter: error.message,
      })
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  },
)

AppDataSource.initialize().then(async () => {
  app.listen(3000, () => {
    console.log('server is running')
  })
})
