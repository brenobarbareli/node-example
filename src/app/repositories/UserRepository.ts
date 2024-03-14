import { hash } from 'bcryptjs'
import { InsertResult } from 'typeorm'
import { AppDataSource } from '../../database/data-source'
import User from '../entities/User'

export const userRepository = AppDataSource.getRepository(User)

function getUsers(): Promise<User[]> {
  return userRepository.find()
}

function getUserById(id: string): Promise<User | null> {
  return userRepository.findOneBy({
    id: id,
  })
}

async function insertUser(
  name: string,
  email: string,
  admin: boolean = false,
  password: string,
): Promise<InsertResult> {
  const passwordHash = await hash(password, 8)

  const newUser = userRepository.create({
    name: name,
    email: email,
    admin: admin,
    password: passwordHash,
  })

  return userRepository.insert(newUser)
}

function verifyIsUserWithSameEmail(email: string): Promise<User | null> {
  return userRepository.findOneBy({
    email: email,
  })
}

export default { getUsers, insertUser, getUserById, verifyIsUserWithSameEmail }
