import { AppState } from '../AppState'
import { api } from './AxiosService'
import { backlogItemsService } from './BacklogItemsService'
import { sprintsService } from './SprintsService'

class TasksService {
  async getTasksByBacklogItemId(id) {
    const res = await api.get(`api/backlogItems/${id}/tasks`)
    AppState.tasks[id] = res.data
  }

  async getTasksBySprintId(id) {
    const res = await api.get(`api/sprints/${id}/tasks`)
    AppState.sprintTasks[id] = res.data
    console.log(AppState.sprintTasks[id], 'sprints by id')
  }

  async createTask(task) {
    const res = await api.post('api/tasks', task)
    AppState.activeTask = res.data
    await this.getTasksByBacklogItemId(task.backlogItemId)
    return res.data.id
  }

  async update(object) {
    const res = await api.put(`api/tasks/${object.id}`, object)
    await this.getTasksByBacklogItemId(object.backlogItemId)
    if (object.sprintId) {
      await this.getTasksBySprintId(object.sprintId)
    }
  }
}
export const tasksService = new TasksService()
