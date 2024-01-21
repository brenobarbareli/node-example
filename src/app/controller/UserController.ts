import { Request, Response, Router } from 'express'
import { ICreateUser } from '../interface/IUser'
import UserRepository from '../repositories/UserRepository'

export const userRouter = Router()

userRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
  const users = await UserRepository.getUsers()
  return res.status(200).json(users)
})

userRouter.get(
  '/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id
    const users = await UserRepository.getUserById(userId)
    return res.status(200).json(users)
  },
)

userRouter.post(
  '/',
  async (
    req: Request<{}, {}, ICreateUser>,
    res: Response,
  ): Promise<Response> => {
    try {
      const { name, email, admin } = req.body

      const userAlreadyExists = await UserRepository.verifyIsUserWithSameEmail(
        email,
      )

      if (userAlreadyExists) {
        throw new Error('userAlreadyExists')
      }

      const result = await UserRepository.insertUser(name, email, admin)

      return res.status(201).json(result)
    } catch (error) {
      console.error(error)
      if (error.message === 'userAlreadyExists') {
        console.log('entrou')
        return res
          .status(400)
          .json({ parameter: 'Já existe um usuário cadastrado com esse email' })
      }
      return res.status(400).json({ parameter: 'Erro ao criar usuário' })
    }
  },
)

export default userRouter
