import { AppState } from '../AppState'
import { api } from './AxiosService'
import { backlogItemsService } from './BacklogItemsService'

class TasksService {
  async getTasksByBacklogItemId(id) {
    const res = await api.get(`api/backlogItems/${id}/tasks`)
    AppState.tasks[id] = res.data
  }

  async createTask(task) {
    console.log(task)
    const res = await api.post('api/tasks', task)
    console.log(res)
    AppState.activeTask = res.data
    await this.getTasksByBacklogItemId(task.backlogItemId)
    return res.data.id
  }

  async update(object) {
    const res = await api.put(`api/tasks/${object.id}`)
  }
}
export const tasksService = new TasksService()
