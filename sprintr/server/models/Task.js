import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const Task = new Schema(
  {
    status: { type: String, enum: ['pending', 'in-progress', 'review', 'done'], default: 'pending' },
    weight: { type: Number, required: true },
    sprintId: { type: ObjectId, ref: 'Sprint', required: true },
    projectId: { type: ObjectId, ref: 'Project', required: true },
    creatorId: { type: ObjectId, ref: 'Account', required: true },
    backlogItemId: { type: ObjectId, ref: 'BacklogItemId', required: true },
    assignedTo: { type: ObjectId, ref: 'Account', required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)
Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
Task.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})
Task.virtual('sprint', {
  localField: 'sprintId',
  ref: 'Sprint',
  foreignField: '_id',
  justOne: true
})
