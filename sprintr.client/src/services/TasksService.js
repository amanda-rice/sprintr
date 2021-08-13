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
    const res = await api.put(`api/tasks/${object.id}`, object)
    console.log(res)
    console.log(AppState.tasks[object.backlogItemId])
    AppState.tasks[object.backlogItemId].find(t => t.id === object.id)
    console.log(AppState.tasks)
  }
}
export const tasksService = new TasksService()
