export interface IUser {
  id?: string
  name: string
  email: string
  admin: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ICreateUser {
  name: string
  email: string
  admin?: boolean
}
