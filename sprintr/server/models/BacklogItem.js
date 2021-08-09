import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const BacklogItem = new Schema(
  {
    name: { type: String, required: true },
    body: { type: String, required: true },
    isOpen: { type: Boolean, required: true, default: true },
    projectId: { type: ObjectId, ref: 'Project', required: true },
    creatorId: { type: ObjectId, ref: 'Account', required: true },
    color: { type: String, required: false }
  }, { timestamps: true, toJSON: { virtuals: true } }
)
BacklogItem.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
BacklogItem.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})
