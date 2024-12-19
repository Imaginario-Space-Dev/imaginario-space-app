import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  name: { type: String}, 
  size: { type: Number},
  mimetype: { type: String}
  }, { timestamps: true });

const noteSchema = new Schema({
  noteDesc: { type: String},
  display: { type: Boolean, default: true}
}, { timestamps: true });

const accessSchema = new Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'User',},
  displayPeriodStart: { type: Date},
  displayPeriodEnd: { type: Date}
}, { timestamps: true });

const IncidentSchema = new mongoose.Schema({
  shorDesc: { type: String, required: true},
  desc: { type: String, required: true},
  // startDate: { type: Date},
  status: { type: String, required: true, enum: ["created", "pending", "resolved", "progress"]},
  priority: { type: String, required: true, enum: ["super-high", "high", "medimun", "low"]},
  pendingReason: { type: String},
  resolution: { type: String},
  notes: { type: [noteSchema]},
  files: { type: [fileSchema]},
  type: { type: String, required: true, enum: ["bug", "request", "task"]},
  display: { type: Boolean, default: true},
  access: { type: [accessSchema]},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true}
}, 
{ 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
 }
); // Add timestamps for createdAt and updatedAt

  
const Incident = mongoose.model('Incident', IncidentSchema);  

export default Incident;
