import { AppState } from '../AppState'
import { api } from './AxiosService'

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
    console.log(res, 'create backlog item')
    AppState.activeBacklogItem = res.data
    await this.getAll()
    return res.data.id
  }

  async destroy(id) {
    await api.delete('api/backlogItems/' + id)
    AppState.backlogItems = AppState.backlogItems.filter(b => b.id !== id)
  }

  async getBacklogItemsByBacklogItemId(backlogItemId) {
    const res = await api.get('api/backlogItems/' + backlogItemId + '/backlogItems')
    AppState.backlogItems = res.data
    console.log(AppState.backlogItems, 'backlogitems')
    console.log(res, 'get backlog by ID')
  }
}

export const backlogItemsService = new BacklogItemsService()
