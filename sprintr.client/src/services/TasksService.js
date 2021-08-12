import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async getTasksByBacklogItemId(id) {
    const res = await api.get(`api/backlogItems/${id}/tasks`)
    console.log(res.data)
    AppState.tasks[id] = res.data
  }
}
export const tasksService = new TasksService()
