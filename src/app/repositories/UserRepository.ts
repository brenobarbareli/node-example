import { InsertResult } from 'typeorm'
import { AppDataSource } from '../../database/data-source'
import User from '../entities/User'

export const userRepository = AppDataSource.getRepository(User)

const getUsers = (): Promise<User[]> => {
  return userRepository.find()
}

const getUserById = (id: string): Promise<User> => {
  return userRepository.findOneBy({
    id: id,
  })
}

const insertUser = (
  name: string,
  email: string,
  admin: boolean = false,
): Promise<InsertResult> => {
  const newUser = new User()
  newUser.name = name
  newUser.email = email
  newUser.admin = admin

  return userRepository.insert(newUser)
}

export default { getUsers, insertUser, getUserById }
