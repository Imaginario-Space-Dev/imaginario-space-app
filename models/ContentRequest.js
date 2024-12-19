import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ContentRequestSchema = new mongoose.Schema({
  requesterId: {  type: mongoose.Schema.ObjectId, required: [true, "Requester ID is required "], ref: 'User',},
  type: { type: String, required: true, enum: ["book", "course"]},
  title: { type: String, required: true},
  author: { type: String, required: true},
  genre: { type: String, required: true, enum: ["Finction", "Non-Fiction"]},
  category: { type: String, required: true},
  display: { type: Boolean, default: true},
}, 
{ 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
 }
); // Add timestamps for createdAt and updatedAt

  
const ContentRequest = mongoose.model('ContentRequest', ContentRequestSchema);  

export default ContentRequest;
