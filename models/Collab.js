import mongoose from 'mongoose';
import slugify from "slugify"
import ErrorResponse from '../utils/errorResponse.js'

const Schema = mongoose.Schema;

const modulesSchema = new Schema({
  courseLanguage: { type: String, required: true, trim: true },
  moduleTitle: { type: String, required: true },
  courseLocked: { type: Boolean, required: true },
  contentFormat: { type: String, required: true, enum: ['pdf', 'video', 'typing'] },
  startingPage: { type: Number, required: true },
  pdfFile: { type: String, required: true },
  videoFile: { type: String, required: true },
  moduleDesc: { type: String, required: true, trim: true }
}, { _id: false });

const chapterSchema = new Schema({
  bookLanguage: { type: String, required: true, trim: true },
  chapterTitle: { type: String, required: true },
  bookLocked: { type: Boolean, required: true },
  contentFormat: { type: String, required: true, enum: ['pdf', 'video', 'typing'] },
  startingPage: { type: Number, required: true },
  pdfFile: { type: String, required: true },
  videoFile: { type: String, required: true },
  chapterDesc: { type: String, required: true, trim: true }
}, { _id: false });

const platformSchema = new Schema({
  contentLanguage: { type: String, 
    // required: true 
  },
  platformName: {
    type: [String],
    enum: ['Amazon', 'Hostmart', 'Other'],
    required: true
  },
  platformNameNotListed: { type: String, trim: true},
  allowsAffiliateLink: { type: Boolean, default: false,
    validate: {
    validator: function (value) {
      return value !== false;
    },
    message: 'Platform must allow affiliate link'
  } },
  productLink: {
    type: String,
    match: [
      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
      'Please use a valid URL with HTTP or HTTPS'
    ],
    required: true
  },
  imaginarioProductLink: {
    type: String,
    match: [
      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  }
}, { _id: false });


const shareSchema = new Schema({
  sender: { type: mongoose.Schema.ObjectId, ref: 'User',},
  receiver: { type: [mongoose.Schema.ObjectId], ref: 'User',},
  sharedAt: { type: Date}
}, { _id: false })

const collabSchema = new mongoose.Schema({
  collabOwner: { 
    type: mongoose.Schema.ObjectId, 
    required: true, 
    ref: 'User'
    },
    author: { 
    type: mongoose.Schema.ObjectId, 
    required: true, 
    ref: 'User'
    },
  bookCreatedBy: { 
    type: mongoose.Schema.ObjectId, 
    required: true, 
    ref: 'User'
    },
  book: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'Book'
    },
  course: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'Course'
    },  
  slug: String,
  visibility: {
    type: String,
    required: [true, 'Please add visibility'],
    default: 'hidden',
    enum: ['hidden', 'show'],
  },
  status: {
    type: String,
    required: [true, 'Please add a status'],
    default: 'pending',
    enum: ['pending', 'active', 'blocked'],
  },
  desc: {
    type: String,
  },
  tags: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    required: true
  },
  like: {
    type: [],
  },
  save: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
  },
  share: {
    type: [shareSchema],
  },
  cart: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
  },
  conbuy: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
  },
  conbook: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
  },

}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

  // Create bootcamp slug from the name
  collabSchema.pre('save', function(next) {
    if(this.type === 'book' && !this.book){
      return new ErrorResponse(`book field cannot be empty`, 404)
    }
    if(this.type === 'course' && !this.course){
      return new ErrorResponse(`course field cannot be empty`, 404)
    }
    next()
  })
const Collab = mongoose.model('Collab', collabSchema);  

export default Collab;

