import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TasksService {
  async edit(body) {
    await this.getById(body.id)
    const task = await dbContext.Task.findByIdAndUpdate(body.id, { name: body.name, status: body.status, weight: body.weight, sprintId: body.sprintId }, { new: true, runValidators: true })
    return task
  }

  async getAll(query = {}) {
    const tasks = await dbContext.Task.find(query)
    return tasks
  }

  async getById(id) {
    const task = await dbContext.Task.findById(id)
    if (!task) {
      throw new BadRequest('Not a task')
    }
    return task
  }

  async create(body) {
    const task = await dbContext.Task.create(body)
    return await this.getOne(task._id, body.creatorId)
  }

  async destroy(id, userId) {
    await this.getOne(id, userId)
    return await dbContext.Task.findByIdAndDelete(id)
  }

  async getOne(id, userId) {
    // const task = await dbContext.Tasks.findOne({ _id: id, creatorId: userId })
    const task = await dbContext.Task.findById(id).populate('creator', 'name picture')
    if (!task) {
      throw new BadRequest('Invalid Id - Not a task')
    }
    if (task.creator.id.toString() !== userId) {
      throw new Forbidden('This is not your task')
    }
    return task
  }
}

export const tasksService = new TasksService()
