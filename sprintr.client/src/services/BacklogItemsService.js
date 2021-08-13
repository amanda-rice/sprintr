import { AppState } from '../AppState'
import { api } from './AxiosService'
import { projectsService } from './ProjectsService'

class BacklogItemsService {
  async getAll() {
    const res = await api.get('api/backlogItems')
    AppState.backlogItems = res.data
  }

  async getByQuery(url = 'api/backlogItems?query=', query = ' ') {
    const res = await api.get(url + query)
    AppState.backlogItems = res.data.backlogItems
  }

  async getById(query) {
    const res = await api.get('api/backlogItems/')
    AppState.backlogItems = res.data.backlogItems
  }

  async createBacklogItem(backlogItem) {
    const res = await api.post('api/backlogItems', backlogItem)
    AppState.activeBacklog = res.data
    await projectsService.getBacklogItemsByProjectId(backlogItem.projectId)
    return res.data.id
  }

  async destroy(id) {
    await api.delete('api/backlogItems/' + id)
    AppState.backlogItems = AppState.backlogItems.filter(b => b.id !== id)
  }

  async getTasksByBacklogItemId(backlogItemId) {
    const res = await api.get('api/backlogItems/' + backlogItemId + '/tasks')
    AppState.backlogItems = res.data
  }
}

export const backlogItemsService = new BacklogItemsService()
