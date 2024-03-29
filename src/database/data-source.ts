import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'nlw',
  synchronize: true,
  logging: false,
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/app/entities/*.ts'],
  subscribers: [],
})
