import { InsertResult } from 'typeorm'
import { AppDataSource } from '../../database/data-source'
import User from '../entities/User'

export const userRepository = AppDataSource.getRepository(User)

const getUsers = (): Promise<User[]> => {
  return userRepository.find()
}

const getUserById = (id: string): Promise<User | null> => {
  return userRepository.findOneBy({
    id: id,
  })
}

const insertUser = (
  name: string,
  email: string,
  admin: boolean = false,
): Promise<InsertResult> => {
  const newUser = userRepository.create({
    name: name,
    email: email,
    admin: admin,
  })

  return userRepository.insert(newUser)
}

const verifyIsUserWithSameEmail = (email: string): Promise<User | null> => {
  return userRepository.findOneBy({
    email: email,
  })
}

export default { getUsers, insertUser, getUserById, verifyIsUserWithSameEmail }
