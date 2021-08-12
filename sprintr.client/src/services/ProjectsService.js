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
    console.log(res)
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
    console.log(AppState.backlogItems, 'backlogitems')
    console.log(res, 'get backlog by ID')
  }

  async getSprintsByProjectId(projectId) {
    const res = await api.get('api/projects/' + projectId + '/sprints')
    AppState.sprints = res.data
    console.log(AppState.sprints, 'backlogitems')
    console.log(res, 'get backlog by ID')
  }
}

export const projectsService = new ProjectsService()
