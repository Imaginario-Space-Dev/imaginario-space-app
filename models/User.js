import crypto from 'crypto'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const Schema = mongoose.Schema;

const NotificationSchema = new mongoose.Schema({
  notifyingId: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'User'
    },
  notifiedId: { 
    type: [mongoose.Schema.ObjectId], 
    required: true, 
    ref: 'User'
    },
  fromCollab: { 
    type: mongoose.Schema.ObjectId
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
    // notifViewedBy: { 
    //   type: [mongoose.Schema.ObjectId], 
    //   ref: 'User'
    //   },
    // connection: {
    //   type: [mongoose.Schema.ObjectId],
    // },
  type: { 
    type: String, 
    required: [true, 'Please add a type'],
    enum: ["book", "course", "blog", "system","like", "save", "cart", "share", "connection"],
    },
  action: { 
    type: String, 
    required: [true, 'Please add a type'],
    enum: ["like", "save", "cart", "share", "system", "connection", "book", "course", "blog", "user", "collab", "clickOnBuy"],
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

const shareSchema = new Schema({
  sender: { type: mongoose.Schema.ObjectId, required: true, ref: 'User',},
  type: { type: String, required: true, enum: ["book", "course", "blog"]},
  book: { type: mongoose.Schema.ObjectId, ref: 'Book',},
  course: { type: mongoose.Schema.ObjectId, ref: 'Course',},
  blog: { type: mongoose.Schema.ObjectId, ref: 'Blog',},
  fromCollab: { type: mongoose.Schema.ObjectId, ref: 'Collab',},
  sharedAt: { type: Date, required: true,}
}, { _id: false })

const cartSchema = new Schema({
  type: { type: String, required: true, enum: ["book", "course"]},
  book: { type: mongoose.Schema.ObjectId, ref: 'Book',},
  course: { type: mongoose.Schema.ObjectId, ref: 'Course',},
  fromCollab: { type: mongoose.Schema.ObjectId, ref: 'Collab',},
  addedAt: { type: Date, required: true,}
}, { _id: false })

const saveSchema = new Schema({
  type: { type: String, required: true, enum: ["book", "course", "blog"]},
  book: { type: mongoose.Schema.ObjectId, ref: 'Book',},
  course: { type: mongoose.Schema.ObjectId, ref: 'Course',},
  blog: { type: mongoose.Schema.ObjectId, ref: 'Blog',},
  fromCollab: { type: mongoose.Schema.ObjectId, ref: 'Collab',},
  savedAt: { type: Date, required: true,}
}, { _id: false })

const connectionSchema = new Schema({
  connectedId: { type: mongoose.Schema.ObjectId, required: true, ref: 'User',},
  fromCollab: { type: mongoose.Schema.ObjectId},
  fromBook: { type: mongoose.Schema.ObjectId, ref: 'Book',},
  fromCourse: { type: mongoose.Schema.ObjectId, ref: 'Course',},
  fromBlog: { type: mongoose.Schema.ObjectId, ref: 'Blog',},
  connectedAt: { type: Date, required: true}
}, { _id: false })

const userPlatformSchema = new Schema({
  displayPeriodStart: { type: Date},
  displayPeriodEnd: { type: Date},
  position: { type: Number, required: [true, 'Please add a position']},
  status: {type: String, required: [true, 'Please add a status'], default: 'pending',enum: ['pending', 'active', 'blocked']},
  someOfOurPublishers: { type: Boolean, default: false},
  someOfOurCollaborators: { type: Boolean, default: false},
  someOfOurEditors: { type: Boolean, default: false},
  someOfOurPartners: { type: Boolean, default: false},
  lastUpdatedAt: { type: Date},
}, { _id: false });

const someOfOurPublishersSchema = new Schema({
  display: { type: Boolean, default: false},
  displayPeriodStart: { type: Date},
  displayPeriodEnd: { type: Date},
  position: { type: Number, required: [true, 'Please add a position']},
  status: {type: String, required: [true, 'Please add a status'], default: 'pending',enum: ['pending', 'active', 'blocked']},
  lastUpdatedAt: { type: Date},
}, { _id: false });

const someOfOurCollaboratorsSchema = new Schema({
  display: { type: Boolean, default: false},
  displayPeriodStart: { type: Date},
  displayPeriodEnd: { type: Date},
  position: { type: Number, required: [true, 'Please add a position']},
  status: {type: String, required: [true, 'Please add a status'], default: 'pending',enum: ['pending', 'active', 'blocked']},
  lastUpdatedAt: { type: Date},
}, { _id: false });

const someOfOurEditorsSchema = new Schema({
  display: { type: Boolean, default: false},
  displayPeriodStart: { type: Date},
  displayPeriodEnd: { type: Date},
  position: { type: Number, required: [true, 'Please add a position']},
  status: {type: String, required: [true, 'Please add a status'], default: 'pending',enum: ['pending', 'active', 'blocked']},
  lastUpdatedAt: { type: Date},
}, { _id: false });

const someOfOurPartnersSchema = new Schema({
  display: { type: Boolean, default: false},
  displayPeriodStart: { type: Date},
  displayPeriodEnd: { type: Date},
  position: { type: Number, required: [true, 'Please add a position']},
  status: {type: String, required: [true, 'Please add a status'], default: 'pending',enum: ['pending', 'active', 'blocked']},
  lastUpdatedAt: { type: Date},
}, { _id: false });

const profileImageSchema = new Schema({
  name: { type: String}, 
  size: { type: Number},
  mimetype: { type: String},
  uploadedAt: { type: Date}
}, { _id: false })

const userAllPlatformSchema = new Schema({
  display: { type: Boolean, default: false},
  displayPeriodStart: { type: Date},
  displayPeriodEnd: { type: Date},
  position: { type: Number, min: 0},
  lastUpdatedAt: { type: Date},
}, { _id: false });


const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'Please add a username']  
    },
    // underscoreName: {
    //     type: String,
    //     unique: true,
    //     required: [true, 'Please add a unique user underscoreName']
    //   },
      spaceName: {
        type: String,
        unique: true,
        required: [true, 'Please add a unique user spaceName']
      },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    role: {
      type: String,
      enum: ['regular', 'publisher', 'editor', 'partner', 'collaborator', 'admin',
         'bookAgent', 'courseAgent', 'blogAgent', 'agent', 'vip','ceo' ],
      default: 'regular'
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    language: {
        type: [String],
        // required: true,
        // validate: {
        //   validator: function (value) {
        //     return value.length > 0;
        //   },
        //   message: 'Language cannot be empty'
        // }
      },
      createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      lastUpdatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      category: {
        type: [String],
        // required: true,
        // validate: {
        //   validator: function (value) {
        //     return value.length > 0;
        //   },
        //   message: 'Category cannot be empty'
        // },
        // enum: ["Finance", "English", "Management", "IT", "Dev", "Influencer"]  
      },
      interestedAreas: {
        type: [String],
        // required: true,
        // validate: {
        //   validator: function (value) {
        //     return value.length > 0;
        //   },
        //   message: 'Interested areas cannot be empty'
        // },
        // enum: ["Finance", "English", "Management"]
      },
      targetAudience: {
        type: [String],
        // required: true,
        // validate: {
        //   validator: function (value) {
        //     return value.length > 0;
        //   },
        //   message: 'Target audience cannot be empty'
        // },
        // enum: ["Finance", "English", "Management"]
      },
      lastLogin: {
        type: Date,
        default: Date.now
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
        // required: [true, 'Please add a description']
      },
      profileImage: { type: profileImageSchema},
      // books: {
      //   type: [mongoose.Schema.ObjectId],
      // },
      // courses: {
      //   type: [mongoose.Schema.ObjectId],
      // },
      // blogs: {
      //   type: [mongoose.Schema.ObjectId],
      // },
      share: {
          type: [shareSchema]
      },
      cOnProfile: {
        type: [mongoose.Schema.ObjectId],
      },
      saved:{
        type: [{}]
      },
      shared:{
        type: [{}]
      },
      sharedWithMe:{
        type: [{}]
      },
      liked:{
        type: [{}]
      },
      cart:{
        type: [{}]
      },
      connection: {
        type: [connectionSchema],
      },
      connectedToMe: {
        type: [connectionSchema],
      },
      collabs: {
        type: [{}],
      }, 
      contentType: {
        type: String,
        default: 'user'
      },
      // notifications: {
      //   type: [mongoose.Schema.ObjectId],
      //   ref: 'Notification'
      // },
      notifications: {
        type: [NotificationSchema],
        // ref: 'Notification'
      },
      lastviewed: {
        type: [],
      },
      someOfOurPublishers: { type: someOfOurPublishersSchema},
      someOfOurCollaborators: { type: someOfOurCollaboratorsSchema},
      someOfOurEditors: { type: someOfOurEditorsSchema},
      someOfOurPartners: { type: someOfOurPartnersSchema},

      recommendedUser: { type: userAllPlatformSchema},
      userOfTheWeek: { type: userAllPlatformSchema},
      userTop10: { type: userAllPlatformSchema},
      userPopular: { type: userAllPlatformSchema},
  }, 

  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
   }

); // Add timestamps for createdAt and updatedAt)

  

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if(!this.isModified('password')){
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// Match user entered password to hashed passowrd in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Generate and hash password token
UserSchema.methods.getSetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hash token ans set to resetPasswordToken field
  this.resetPasswordToken = crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex')

  // Set expire in 10 minutes
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

  return resetToken
}

  // Cascade delete courses when a bootcamp is deleted
  // UserSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  //   console.log(`Books being removed from this user ${this._id}`);
  //   await this.model('Book').deleteMany({ createdBy: this._id });
  //   next();
  // });

// Reverse populate with virtuals
  UserSchema.virtual('book', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'createdBy',
    justOne: false
})

UserSchema.virtual('course', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'createdBy',
  justOne: false
})

UserSchema.virtual('blog', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'createdBy',
  justOne: false
})


const User = mongoose.model('User', UserSchema);

export default User