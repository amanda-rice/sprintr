import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async create(note) {
    const res = await api.post('api/notes', note)
    console.log(res, 'create backlog item')
    AppState.activeBacklog = res.data
    await this.getNotesByTaskId(note.taskId)
    return res.data.id
  }

  async getNotesByTaskId(taskId) {
    const res = await api.get(`api/tasks/${taskId}/notes`)
    AppState.notes[taskId] = res.data
  }
}

export const notesService = new NotesService()
