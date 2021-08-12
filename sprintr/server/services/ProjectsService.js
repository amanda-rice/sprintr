import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ProjectsService {
  async getAll(query = {}) {
    const projects = await dbContext.Project.find(query)
    return projects
  }

  async getById(id) {
    const project = await dbContext.Project.findById(id)
    if (!project) {
      throw new BadRequest('Not a project')
    }
    return project
  }

  async create(body) {
    const project = await dbContext.Project.create(body)
    return await this.getOne(project._id, body.creatorId)
  }

  async destroy(id, userId) {
    await this.getOne(id, userId)
    await dbContext.Project.findByIdAndDelete(id)
    await dbContext.Task.deleteMany({ projectId: id })
    await dbContext.BacklogItem.deleteMany({ projectId: id })
  }

  async getOne(id, userId) {
    // const project = await dbContext.Projects.findOne({ _id: id, creatorId: userId })
    const project = await dbContext.Project.findById(id).populate('creator', 'name picture')
    if (!project) {
      throw new BadRequest('Invalid Id')
    }
    if (project.creator.id.toString() !== userId) {
      throw new Forbidden('This is not your project')
    }
    return project
  }
}

export const projectsService = new ProjectsService()
