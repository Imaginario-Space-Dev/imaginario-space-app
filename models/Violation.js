import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ViolationSchema = new mongoose.Schema({
    reporterUserId: { type: mongoose.Schema.ObjectId, required: [true, "Reporter user ID is required "], ref: 'User',},
    reportedUserId: { type: mongoose.Schema.ObjectId,  ref: 'User',},
    reportedBookId: { type: mongoose.Schema.ObjectId,  ref: 'Book',},
    reportedCourseId: { type: mongoose.Schema.ObjectId,  ref: 'Course',},
    reportedBlogId: { type: mongoose.Schema.ObjectId,  ref: 'Blog',},
    desc: { type: String},
    reason: { type: String, required: [true, "<Reason> is required"]},
    type: { type: String, required: true, enum: ["book", "course", "user", "blog"]},
    display: { type: Boolean, default: true},
    status: { type: String, required: true, enum: ["pending", "resolved", "progress"]},
}, 
{ 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
 }
); // Add timestamps for createdAt and updatedAt

  
const Violation = mongoose.model('Violation', ViolationSchema);  

export default Violation;
