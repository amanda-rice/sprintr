import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProjectsService {
  async getAll() {
    const res = await api.get('api/projects')
    AppState.projects = res.data
    console.log(res)
  }

  async getByQuery(url = 'api/projects?query=', query = ' ') {
    const res = await api.get(url + query)
    AppState.projects = res.data.projects
  }

  async getById(query) {
    const res = await api.get('api/projects/')
    AppState.projects = res.data.projects
  }

  async createProject(project) {
    const res = await api.post('api/projects', project)
    await this.getAll()
  }

  async destroy(id) {
    await api.delete('api/projects/' + id)
    AppState.projects = AppState.projects.filter(a => a.id !== id)
  }
}

export const projectsService = new ProjectsService()
