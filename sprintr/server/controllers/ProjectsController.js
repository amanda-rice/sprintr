
import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsService } from '../services/ProjectsService'
import { backlogItemsService } from '../services/BacklogItemsService'
import { sprintsService } from '../services/SprintsService'
import BaseController from '../utils/BaseController'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id/backlogItems', this.getBacklogItemsByProjectId)
      .get('/:id/sprints', this.getSprintsByProjectId)
      .post('', this.create)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const projects = await projectsService.getAll(req.query)
      res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getBacklogItemsByProjectId(req, res, next) {
    try {
      const backlogItems = await backlogItemsService.getAll({ projectId: req.params.id })
      res.send(backlogItems)
    } catch (error) {
      next(error)
    }
  }

  async getSprintsByProjectId(req, res, next) {
    try {
      const sprints = await sprintsService.getAll({ projectId: req.params.id })
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.create(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await projectsService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: 'Deleted Project Successfully' })
    } catch (error) {
      next(error)
    }
  }
}
