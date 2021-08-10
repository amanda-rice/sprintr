import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class SprintsService {
  async getAll(query = {}) {
    const sprints = await dbContext.Sprint.find(query)
    return sprints
  }

  async create(body) {
    const sprint = await dbContext.Sprint.create(body)
    return await this.getOne(sprint._id, body.creatorId)
  }

  async destroy(id, userId) {
    await this.getOne(id, userId)
    return await dbContext.Sprint.findByIdAndDelete(id)
  }

  async getOne(id, userId) {
    // const sprint = await dbContext.Sprints.findOne({ _id: id, creatorId: userId })
    const sprint = await dbContext.Sprint.findById(id).populate('creator', 'name picture')
    if (!sprint) {
      throw new BadRequest('Invalid Id')
    }
    if (sprint.creator.id.toString() !== userId) {
      throw new Forbidden('This is not your sprint')
    }
    return sprint
  }
}

export const sprintsService = new SprintsService()
