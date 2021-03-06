
import { Auth0Provider } from '@bcwdev/auth0provider'
import { sprintsService } from '../services/SprintsService'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'

export class SprintsController extends BaseController {
  constructor() {
    super('api/sprints')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getTasksBySprintId)
      .post('', this.create)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const sprints = await sprintsService.getAll(req.query)
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const sprint = await sprintsService.getById(req.params.id)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async getTasksBySprintId(req, res, next) {
    try {
      const tasks = await tasksService.getAll({ sprintId: req.params.id })
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const sprint = await sprintsService.create(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await sprintsService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: 'Deleted Sprint Successfully' })
    } catch (error) {
      next(error)
    }
  }
}
