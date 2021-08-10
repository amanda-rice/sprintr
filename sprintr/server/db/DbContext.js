import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { Project as ProjectSchema } from '../models/Project'
import { BacklogItem as BacklogItemSchema } from '../models/BacklogItem'
import { Note as NoteSchema } from '../models/Note'
import { Sprint as SprintSchema } from '../models/Sprint'
import { Task as TaskSchema } from '../models/Task'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Project = mongoose.model('Project', ProjectSchema);
  BacklogItem = mongoose.model('BacklogItem', BacklogItemSchema);
  Note = mongoose.model('Note', NoteSchema);
  Sprint = mongoose.model('Sprint', SprintSchema);
  Task = mongoose.model('Task', TaskSchema);
}

export const dbContext = new DbContext()
