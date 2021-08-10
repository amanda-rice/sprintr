import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NotesService {
  async edit(body) {
    await this.getById(body.id)
    const note = await dbContext.Note.findByIdAndUpdate(body.id, { body: body.body }, { new: true, runValidators: true })
    return note
  }

  async getAll(query = {}) {
    const notes = await dbContext.Note.find(query)
    return notes
  }

  async getById(id) {
    const note = await dbContext.Note.findById(id)
    if (!note) {
      throw new BadRequest('Not a note')
    }
    return note
  }

  async create(body) {
    const note = await dbContext.Note.create(body)
    return await this.getOne(note._id, body.creatorId)
  }

  async destroy(id, userId) {
    await this.getOne(id, userId)
    return await dbContext.Note.findByIdAndDelete(id)
  }

  async getOne(id, userId) {
    // const note = await dbContext.Notes.findOne({ _id: id, creatorId: userId })
    const note = await dbContext.Note.findById(id).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('Invalid Id - Not a note')
    }
    if (note.creator.id.toString() !== userId) {
      throw new Forbidden('This is not your note')
    }
    return note
  }
}

export const notesService = new NotesService()
