
import { Auth0Provider } from '@bcwdev/auth0provider'
import { backlogItemsService } from '../services/BacklogItemsService'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'

export class BacklogItemsController extends BaseController {
  constructor() {
    super('api/backlogItems')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tasks', this.getTasksByBacklogItemId)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const backlogItems = await backlogItemsService.getAll(req.query)
      res.send(backlogItems)
    } catch (error) {
      next(error)
    }
  }

  async getTasksByBacklogItemId(req, res, next) {
    try {
      const tasks = await tasksService.getAll({ backlogItemId: req.params.id, creatorId: req.userInfo.id })
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.getById(req.params.id)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const backlogItem = await backlogItemsService.create(req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.id = req.params.id
      const backlogItem = await backlogItemsService.edit(req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await backlogItemsService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: 'Deleted BacklogItem Successfully' })
    } catch (error) {
      next(error)
    }
  }
}
