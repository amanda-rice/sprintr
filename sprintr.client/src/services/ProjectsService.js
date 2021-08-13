import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProjectsService {
  async getAll() {
    const res = await api.get('api/projects')
    AppState.projects = res.data
  }

  async getByQuery(url = 'api/projects?query=', query = ' ') {
    const res = await api.get(url + query)
    AppState.projects = res.data.projects
  }

  async getById(id) {
    const res = await api.get('api/projects/' + id)
    AppState.activeProject = res.data
  }

  async createProject(project) {
    const res = await api.post('api/projects', project)
    AppState.activeProject = res.data
    await this.getAll()
    return res.data.id
  }

  async destroy(id) {
    await api.delete('api/projects/' + id)
    AppState.projects = AppState.projects.filter(a => a.id !== id)
  }

  async getBacklogItemsByProjectId(projectId) {
    const res = await api.get('api/projects/' + projectId + '/backlogItems')
    AppState.backlogItems = res.data
  }

  async getSprintsByProjectId(projectId) {
    const res = await api.get('api/projects/' + projectId + '/sprints')
    AppState.sprints = res.data
  }
}

export const projectsService = new ProjectsService()
