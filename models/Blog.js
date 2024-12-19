import mongoose from 'mongoose';
import slugify from "slugify"

const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    blogLanguage: { type: String, required: true},
    sectionTitle: { type: String, required: true },
    sectionImage: { type: String, required: true },
    sectionDesc: { 
        type: String, 
        required: true, minlength: [100, 'Section cannot be less than 100 characters'],
        maxlength: [500, 'Section cannot be more than 100 characters'],
        required: [true, 'Please add a description'], trim: true },
    sectionShow: { type: Number, required: true }
  }, { _id: false });

const BlogSchema = new mongoose.Schema({
  language: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: 'Language cannot be empty'
    }
  },
  title: {
    type: String,
    minlength: [1, 'Please add title'],
    maxlength: [40, 'Title cannot be longer than 40 characters'],
    required: [true, 'Please add a title'],
    trim: true
  },
  slug: String,
  // createdBy: {
  //   type: String,
  //   required: [true, 'Please add the book creator']
  // },
  // author: {
  //   type: String,
  //   required: [true, 'Please add an author']
  // },
  ownership: {
    type: Boolean,
  },
  category: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: 'Category cannot be empty'
    },
    enum: ["Finance", "English", "Management"]
  },
  targetAudience: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: 'Target Audience cannot be empty'
    },
    enum: ["Finance","Self-developement","Management"]
  },
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
    minlength: [2, 'Description cannot be less than 100 characters'], //Description will not have less than ex: 100 characters
    maxlength: [500, 'Description cannot be more than 100 characters'],
    required: [true, 'Please add a description'],
    trim: true
  },
  coverImage: {
    type: String,
    required: [true, 'Please add a cover image']
  },
  tags: {
    type: String,
    trim: true
  },

  statement: {
    type: Boolean,
    required: [true, 'Please confirm the statement'],
    enum: [true]
  },
  like: {
    type: [mongoose.Schema.ObjectId],
  },
  save: {
    type: [mongoose.Schema.ObjectId],
  },
  share: {
    type: [mongoose.Schema.ObjectId],
  },
  conblog: {
    type: [mongoose.Schema.ObjectId],
  },
  sections: {
    type: [sectionSchema],
  },
  recommendedList: {
    type: [mongoose.Schema.ObjectId],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please add the blog creator']
  }
}, 
{ 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
 }
); // Add timestamps for createdAt and updatedAt

  // Create bootcamp slug from the name
  BlogSchema.pre('save', function(next) {
    this.slug = slugify(this.title, {lower: true})
    next()
  })

    // Reverse populate with virtuals
  //   BlogSchema.virtual('createdby', {
  //     ref: 'User',
  //     localField: 'createdBy',
  //     foreignField: '_id',
  //     justOne: true
  // })
  
const Blog = mongoose.model('Blog', BlogSchema);  

export default Blog;
