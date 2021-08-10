import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const Sprint = new Schema(
  {
    name: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    isOpen: { type: Boolean, required: true },
    projectId: { type: ObjectId, ref: 'Project', required: true },
    creatorId: { type: ObjectId, ref: 'Account', required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)
Sprint.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
Sprint.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})
