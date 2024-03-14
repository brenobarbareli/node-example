export interface IUser {
  id?: string
  name: string
  email: string
  admin: boolean
  password?: string
  createdAt: Date
  updatedAt: Date
}

export interface ICreateUser {
  name: string
  email: string
  password: string
  admin?: boolean
}
