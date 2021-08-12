import { AppState } from '../AppState'
import { api } from './AxiosService'
import { backlogItemsService } from './BacklogItemsService'

class TasksService {
  async getTasksByBacklogItemId(id) {
    const res = await api.get(`api/backlogItems/${id}/tasks`)
    console.log(res.data)
    AppState.tasks[id] = res.data
  }

  async createTask(task) {
    const res = await api.post('api/tasks', task)
    console.log(res, 'create task')
    AppState.activeTask = res.data
    await backlogItemsService.getTasksByProjectId(task.backlogId)
    return res.data.id
  }

  async update(object) {
    const res = await api.put(`api/tasks/${object.id}`)
  }
}
export const tasksService = new TasksService()
