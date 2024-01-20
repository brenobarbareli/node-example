import express from 'express'
import 'reflect-metadata'
import './data-source'

const app = express()

app.listen(3000, () => console.log('server is running'))
