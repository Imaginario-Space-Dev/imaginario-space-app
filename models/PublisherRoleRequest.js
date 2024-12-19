import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PublisherRoleRequestSchema = new mongoose.Schema({
  requesterId: {  type: mongoose.Schema.ObjectId, required: [true, "Requester ID is required "], ref: 'User',},
  status: { type: String, enum: ["pending", "approved", "denied"], default: "pending"},
  display: { type: Boolean, default: true},
  desc: { type: String, required: true},
}, 
{ 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
 }
); // Add timestamps for createdAt and updatedAt

  
const PublisherRoleRequest = mongoose.model('PublisherRoleRequest', PublisherRoleRequestSchema);  

export default PublisherRoleRequest;
