import mongoose from 'mongoose';
import slugify from "slugify"

const Schema = mongoose.Schema; 

const coverImagechema = new Schema({
  name: { type: String},
  originalName: { type: String}, 
  size: { type: Number},
  mimetype: { type: String},
  uploadedAt: { type: Date}
}, { _id: false })

const coursePDFchema = new Schema({
  name: { type: String},
  originalName: { type: String}, 
  size: { type: Number},
  mimetype: { type: String},
  uploadedAt: { type: Date}
}, { _id: false })

const collabSchema = new Schema({
  ownerId: { type: mongoose.Schema.ObjectId, required: true, ref: 'User',},
  collaboratorId: { type: mongoose.Schema.ObjectId, required: true, ref: 'User',},  
  contentType: { type: String, default: 'course'},
  sellingPlatforms: { type: [{}]},
  // contentDefaultLanguage: { type: String, 
  // required: true 
  // },
  platformName: {
    type: [String],
    // enum: ['Amazon', 'Hostmart', 'Other'],
    required: true
  },
  platformNameNotListed: { type: String, trim: true},
  status: {type: String, default: 'pending', enum: ['pending', 'active', 'Denied'],},
  display: {type: String, default: 'show', enum: ['show', 'hide'],},
  denialReason: { type: String, default: true},
  allowsAffiliateLink: { type: Boolean,
    validate: {
    validator: function (value) {
      return value === false;
    },
    message: 'Platform must allow affiliate link'
  } },
  courseLink: {
    type: String,
    match: [
      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
      'Please use a valid URL with HTTP or HTTPS'
    ],
    required: true
  }
}, { timestamps: true })

const likeSchema = new Schema({
  userId: { type: mongoose.Schema.ObjectId, required: true, ref: 'User',},
  fromCollab: { type: mongoose.Schema.ObjectId},
  contentType: { type: String, default: 'course'},
  likedAt: { type: Date, required: true},
}, { _id: false })

const saveSchema = new Schema({
  userId: { type: mongoose.Schema.ObjectId, required: true, ref: 'User',},
  fromCollab: { type: mongoose.Schema.ObjectId},
  contentType: { type: String, default: 'course'},
  savedAt: { type: Date, required: true}
}, { _id: false })

const cartSchema = new Schema({
  userId: { type: mongoose.Schema.ObjectId, required: true, ref: 'User',},
  fromCollab: { type: mongoose.Schema.ObjectId},
  contentType: { type: String, default: 'course'},
  addedAt: { type: Date, required: true}
}, { _id: false }) 

const clicksSchema = new Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'User',},
  fromCollab: { type: mongoose.Schema.ObjectId},
  contentType: { type: String, default: 'course'},
  clickedAt: { type: Date, required: true}
}, { _id: false }) 

const shareSchema = new Schema({ 
  sender: { type: mongoose.Schema.ObjectId, required: true, ref: 'User',},
  receiver: { type: [mongoose.Schema.ObjectId], required: true, ref: 'User',},
  fromCollab: { type: mongoose.Schema.ObjectId},
  contentType: { type: String, default: 'course'},
  sharedAt: { type: Date, required: true,}
}, { _id: false })

const chapterSchema = new Schema({
  chapterLanguage: { type: String, required: true, trim: true },
  chapterTitle: { type: String, required: true },
  chapterLocked: { type: Boolean, required: true },
  contentFormat: { type: String, required: true, enum: ['PDF', 'video', 'typing'] },
  startingPage: { type: Number},
  pdfFile: { type: String },
  videoFile: { type: String },
  // chapterDesc: { type: String, required: true, trim: true }
}, {timestamps: true});


const platformSchema = new Schema({
  // contentLanguage: { type: String, required: true },
  // platformName: { type: mongoose.Schema.ObjectId, ref: 'Platform' },  // Reference to Platform model
  platformName: { type: String, required: true }, 
  platformNameNotListed: { type: String },
  platformListed: { type: Boolean, default: true},
  allowsAffiliateLink: { 
    type: Boolean, 
    default: false,
    validate: {
      validator: function(value) {
        return value !== false;
      },
      message: 'Platform must allow affiliate link'
    }
  },
  courseLink: {
    type: String,
    match: [
      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
      'Please use a valid URL with HTTP or HTTPS'
    ],
    required: true
  },
  imaginarioCourseLink: {
    type: String,
    match: [
      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  imageName: { type: String},
  imageOriginalName: { type: String}
}, { timestamps: true });



const coursePlatformSchema = new Schema({
  display: { type: Boolean, default: false},
  displayPeriodStart: { type: Date},
  displayPeriodEnd: { type: Date},
  position: { type: Number, min: 0, unique: true},
  // position: { type: Number, min: 1},
  lastUpdatedAt: { type: Date},
}, { _id: false });

const promotionSchema = new Schema({
  reduction:{ type: Number, required: true},
  displayPeriodStart: { type: Date},
  displayPeriodEnd: { type: Date},
  status: { type: Boolean, default: false},
  platforms: { type: ['']},
  // sellingPlatforms: { type: [mongoose.Schema.ObjectId]},
  updatedAt: { type: Date, required: true}
}, { _id: false }) 

const editorSchema = new Schema({
  userId: { type: mongoose.Schema.ObjectId, required: true, ref: 'User',},
  status: {type: String, required: [true, 'Please add a status'], default: 'pending', enum: ['pending', 'active', 'blocked'],},
  lastUpdatedAt: { type: Date},
  dealine: { type: Date},
}, { _id: false });

const courseSchema = new mongoose.Schema({
  language: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: 'Please, add Language'
    }
  },
  languageTrackId: {
    type: String,
  },
  title: {
    type: String,
    minlength: [1, 'Please add title'],
    maxlength: [40, 'Title cannot be longer than 40 characters'],
    required: [true, 'Please add a Title'],
    trim: true
  },
  slug: String,
  ownership: {
    type: Boolean,
  },
  // category: {
  //   type: [String],
  //   required: [true, 'Please add one or more Categories'],
  // },
  targetAudience: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: 'Please, add one or more Target Audiences'
    }
  },
  numberOfChapters: {
    type: Number
  },
  visibility: {
    type: String,
    required: [true, 'Please choose Visibility'],
    default: 'hidden',
    enum: ['hidden', 'show'],
  },
  status: {
    type: String,
    required: [true, 'Please choose a status'],
    default: 'pending',
    enum: ['pending', 'active', 'blocked'],
  },
  desc: {
    type: String,
    required: [true, 'Please add a description']
  }, 
  coverImage: {
    type: coverImagechema,
  },
  coursePDF: {
    type: coursePDFchema,
  },
  tags: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please add the book creator']
  },
  level: {
    type: [String],
    required: [true, "Please, add Level"],
    enum: ["Begineer","Intermediate","Advance", "All Levels"]
  },
  termsOfUse: {
    type: Boolean,
    required: [true, 'Please confirm the terms of use'],
    enum: [true]
  },
  like: {
    type: [likeSchema],
  },
  save: {
    type: [saveSchema],
  },
  share: {
    type: [shareSchema],
  },
  cart: {
    type: [cartSchema],
  },
  clickOnBuy: { 
    type: [clicksSchema],
  },
  clickOnCourse: {
    type: [clicksSchema],
  },
  chapterList: {
    type: [chapterSchema],
  },
  platforms: {
    type: [platformSchema],
  },
  collabs: {
    type: [collabSchema],
  },
  author: {
    type: String,
    required: [true, 'Please add Author'],
  },  
  recommendedCourse: { type: coursePlatformSchema},
  courseOfTheWeek: { type: coursePlatformSchema},
  courseTop10: { type: coursePlatformSchema},
  coursePopular: { type: coursePlatformSchema},
  inEdition: {
    type: Boolean,
    default: true,
  },
  editors: {
    type: [editorSchema],
  },
  promotion: { type: promotionSchema},
  pdfUploaded: { type: String},
  videoUploaded: { type: String},
  contentType: { type: String, default: "course"},
  
  // to filter in "Suggest a book/course input"
  authorName: {
    type: String,
    trim: true
  },
  sellingPlatAllowsAffiLink: {
    type: Boolean,
    required: [true, 'Please confirm the Statement'],
    enum: [true]
  }
  
 
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
 }); // Add timestamps for createdAt and updatedAt

  // Create bootcamp slug from the name
  courseSchema.pre('save', function(next) {
    this.slug = slugify(this.title, {lower: true})
    next()
  })

const Course = mongoose.model('Course', courseSchema);  

export default Course;
