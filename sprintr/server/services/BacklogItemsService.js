import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BacklogItemsService {
  async edit(body) {
    await this.getById(body.id)
    const backlogItem = await dbContext.BacklogItem.findByIdAndUpdate(body.id, { isOpen: body.isOpen }, { new: true, runValidators: true })
    return backlogItem
  }

  async getAll(query = {}) {
    const backlogItems = await dbContext.BacklogItem.find(query)
    return backlogItems
  }

  async getById(id) {
    const backlogItem = await dbContext.BacklogItem.findById(id)
    if (!backlogItem) {
      throw new BadRequest('Not a backlogItem')
    }
    return backlogItem
  }

  async create(body) {
    const backlogItem = await dbContext.BacklogItem.create(body)
    return await this.getOne(backlogItem._id, body.creatorId)
  }

  async destroy(id, userId) {
    await this.getOne(id, userId)
    return await dbContext.BacklogItem.findByIdAndDelete(id)
  }

  async getOne(id, userId) {
    // const backlogItem = await dbContext.BacklogItems.findOne({ _id: id, creatorId: userId })
    const backlogItem = await dbContext.BacklogItem.findById(id).populate('creator', 'name picture')
    if (!backlogItem) {
      throw new BadRequest('Invalid Id - Not a backlogItem')
    }
    if (backlogItem.creator.id.toString() !== userId) {
      throw new Forbidden('This is not your backlogItem')
    }
    return backlogItem
  }
}

export const backlogItemsService = new BacklogItemsService()
