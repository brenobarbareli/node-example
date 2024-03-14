import { Router } from 'express'
import tagRouter from '../controller/TagController'
import userRouter from '../controller/UserController'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const routers = Router()

routers.use('/users', userRouter)
routers.use('/tags', ensureAdmin, tagRouter)

export default routers
