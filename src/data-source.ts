import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'nlw',
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
})

AppDataSource.initialize()
  .then(() => {})
  .catch((error) => console.log(error))
