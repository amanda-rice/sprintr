
import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/notes', this.getNotesByTaskId)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.destroy)
  }

  async getNotesByTaskId(req, res, next) {
    try {
      const notes = await notesService.getAll({ taskId: req.params.id })
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const tasks = await tasksService.getAll(req.query)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const task = await tasksService.getById(req.params.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.create(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.id = req.params.id
      const task = await tasksService.edit(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await tasksService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: 'Deleted Task Successfully' })
    } catch (error) {
      next(error)
    }
  }
}
