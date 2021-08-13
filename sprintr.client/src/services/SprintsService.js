import { AppState } from '../AppState'
import { api } from './AxiosService'
import { projectsService } from './ProjectsService'

class SprintsService {
  async getAll() {
    const res = await api.get('api/sprints')
    AppState.sprints = res.data
  }

  async getByQuery(url = 'api/sprints?query=', query = ' ') {
    const res = await api.get(url + query)
    AppState.sprints = res.data.sprints
  }

  async getById(id) {
    const res = await api.get(`api/sprints/${id}`)
    AppState.activeSprint = res.data
  }

  async createSprint(sprint) {
    const res = await api.post('api/sprints', sprint)
    AppState.activeSprint = res.data
    await projectsService.getSprintsByProjectId(sprint.projectId)
    return res.data.id
  }

  async destroy(id) {
    await api.delete('api/sprints/' + id)
    AppState.sprints = AppState.sprints.filter(b => b.id !== id)
  }

  async getSprintsByProjectId(projectId) {
    const res = await api.get('api/projects/' + projectId + '/sprints')
    AppState.sprints = res.data
  }
}

export const sprintsService = new SprintsService()
