import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async create(note) {
    const res = await api.post('api/notes', note)
    AppState.activeBacklog = res.data
    await this.getNotesByTaskId(note.taskId)
    return res.data.id
  }

  async getNotesByTaskId(taskId) {
    const res = await api.get(`api/tasks/${taskId}/notes`)
    AppState.notes[taskId] = res.data
  }

  async destroy(id, taskId) {
    await api.delete('api/notes/' + id)
    this.getNotesByTaskId(taskId)
  }
}

export const notesService = new NotesService()
