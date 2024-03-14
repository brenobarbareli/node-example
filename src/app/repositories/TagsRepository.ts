import { InsertResult } from 'typeorm'
import { AppDataSource } from '../../database/data-source'
import Tag from '../entities/Tag'

export const tagsRepository = AppDataSource.getRepository(Tag)

function getTags(): Promise<Tag[]> {
  return tagsRepository.find()
}

function getTabById(id: string): Promise<Tag | null> {
  return tagsRepository.findOneBy({
    id: id,
  })
}

function getTagByName(name: string) {
  return tagsRepository.findOneBy({ name })
}

function insertTag(name: string): Promise<InsertResult> {
  const newTag = tagsRepository.create({
    name: name,
  })

  return tagsRepository.insert(newTag)
}

export default { getTags, getTabById, getTagByName, insertTag }
