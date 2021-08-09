import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ProjectsService {
  async getAll(query = {}) {
    const projects = await dbContext.Project.find(query).populate('creator', 'name picture')
    return projects
  }

  async getOne(id, userId) {
    // const project = await dbContext.Projects.findOne({ _id: id, creatorId: userId })
    const project = await dbContext.Project.findById(id).populate('creator', 'name picture')
    if (!project) {
      throw new BadRequest('Invalid Id')
    }
    if (project.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your project')
    }
    return project
  }

  async create(body) {
    const project = await dbContext.Project.create(body)
    return await this.getOne(project._id, body.creatorId)
  }
}

export const projectsService = new ProjectsService()
