import mongoose from 'mongoose';
import slugify from "slugify"
import ErrorResponse from '../utils/errorResponse.js'

const NotificationSchema = new mongoose.Schema({
  notifyingId: { 
    type: mongoose.Schema.ObjectId, 
    required: true, 
    ref: 'User'
    },
  notifiedId: { 
    type: [mongoose.Schema.ObjectId], 
    required: true, 
    ref: 'User'
    },
  fromCollab: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'Collab'
    },
    contentIdBook: { 
      type: mongoose.Schema.ObjectId, 
      ref: 'Book'
      },
      contentIdCourse: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'Course'
        },
    // receivers: { 
    //   type: [mongoose.Schema.ObjectId], 
    //   ref: 'User'
    //   },
    notifViewedBy: { 
      type: [mongoose.Schema.ObjectId], 
      ref: 'User'
      },
    connection: {
      type: [mongoose.Schema.ObjectId],
    },
  type: { 
    type: String, 
    required: [true, 'Please add a type'],
    enum: ["book", "course", "blog", "system","like", "save", "cart", "share", "connection"],
    },
  action: { 
    type: String, 
    required: [true, 'Please add a type'],
    enum: ["like", "save", "cart", "share", "system", "connection", "book", "course", "blog", "user"],
    },
  message: { 
    type: String,
    minlength: [1, 'Please add message'],
    maxlength: [150, 'message cannot be longer than 40 characters'],
    required: [true, 'Please add a message'],
    trim: true
    },  
  visibility: {
    type: String,
    default: 'show',
    enum: ['hidden', 'show'],
  },
  promotion: {
    type: Number,
  },
  notifiedIdViewed: {
    type: Boolean,
    default: false,
  },
  link:{
    type: String,
  },
  collabOwnerViewed: {
    type: Boolean,
    default: false,
  }
},{timestamps: true}); // Add timestamps for createdAt and updatedAt

const Notification = mongoose.model('Notification', NotificationSchema);  

export default Notification;
