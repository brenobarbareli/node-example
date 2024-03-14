import { Router } from 'express'
import tagRouter from '../controller/TagController'
import userRouter from '../controller/UserController'

const routers = Router()

routers.use('/users', userRouter)
routers.use('/tags', tagRouter)

export default routers
