import { Request, Response, Router } from 'express'
import { ICreateTag } from '../interface/ITag'
import TagsRepository from '../repositories/TagsRepository'

export const tagRouter = Router()

tagRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
  const tags = await TagsRepository.getTags()
  return res.status(200).json(tags)
})

tagRouter.post(
  '/',
  async (
    req: Request<{}, {}, ICreateTag>,
    res: Response,
  ): Promise<Response> => {
    const { name } = req.body

    if (!name) {
      throw new Error('Incorrect name!')
    }

    const hasTagWithSameName = await TagsRepository.getTagByName(name)
    if (hasTagWithSameName) {
      throw new Error('Tag already exists')
    }

    const tags = await TagsRepository.insertTag(name)

    return res.status(200).json(tags)
  },
)

tagRouter.put(
  '/:id',
  async (
    req: Request<{ id }, {}, ICreateTag>,
    res: Response,
  ): Promise<Response> => {
    const { name } = req.body
    const id = req.params.id

    if (!id) {
      throw new Error('Incorrect id')
    }

    if (!name) {
      throw new Error('Incorrect name!')
    }

    const tagToUpdate = await TagsRepository.getTabById(id)

    if (!tagToUpdate) {
      throw new Error('Tag not found')
    }

    tagToUpdate.name = name

    const tags = await TagsRepository.updateTag(id, name)

    return res.status(200).json({ parameter: 'tag.updated' })
  },
)

export default tagRouter
