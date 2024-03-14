import { InsertResult, UpdateResult } from 'typeorm'
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

async function updateTag(id: string, name: string): Promise<UpdateResult> {
  return tagsRepository.update(id, { name })
}

export default { getTags, getTabById, getTagByName, insertTag, updateTag }
