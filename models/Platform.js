import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const landingCarouselSchema = new Schema({
    url: { type: String },
    file: { type: String, required: true},
    displayPeriodStart: { type: Date},
    displayPeriodEnd: { type: Date},
    position: { type: Number, min: 0, required: true},
    promo: { type: Number, min: 1},
    title: { type: String, required: true},
    desc: { type: String},
    fromPlatform: { type: Boolean, default: true},
    display: { type: Boolean, default: false},
    contentType: { type: String, required: true, enum: ["book", "course", "promotion"]},
  }, {timestamps: true });

  const FaQSchema = new Schema({
    question: { type: String, required: true,},
    answer: { type: String, required: true, },
    link: { type: String, match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please use a valid URL with HTTP or HTTPS']},
    image: { type: String },
    position: { type: Number, min: 0, required: true},
    display: { type: Boolean, default: false},
  }, {timestamps: true});

  const testimonialSchema = new Schema({
    userId: { type: mongoose.Schema.ObjectId, required: true, ref: "User"},
    message: { type: String, required: true },
    position: { type: Number, min: 0},
    rate: { type: Number, min: 1, min: 5},
  }, {timestamps: true});

  const ourMissionSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true }
  }, {timestamps: true});

  const partnerSchema = new Schema({
    name: { type: String, required: true},
    desc: { type: String, required: true},
    logo: { type: String, required: true},
    displayPeriodStart: { type: Date},
    displayPeriodEnd: { type: Date},
    position: { type: Number, min: 0},
    display: { type: Boolean, default: false},
  }, {timestamps: true});

  const platformVideosSchema = new Schema({
    name: { type: String}, 
    size: { type: Number},
    mimetype: { type: String},
    uploadedAt: { type: Date}
  }, { _id: false })

  const sellingPlatformSchema = new Schema({
    platformName: {type: String, required: true},
    platformURL: {type: String, required: true},
    image: {type: String},
    imageOriginalName: {type: String},
    platformNameListed: { type: Boolean},
    display: { type: Boolean, default: false},
    allowsAffiliateLink: { type: Boolean, default: true,
      validate: {
      validator: function (value) {
        return value !== false;
      }}
    }
  }, {timestamps: true})

  const visitsSchema = new Schema({
    // userId: { type: mongoose.Schema.ObjectId, ref: 'User',},
    visitedAt: { type: Date, required: true}
  }, { _id: false }) 

const PlatformSchema = new mongoose.Schema({
  landingCarousel: {
    type: [landingCarouselSchema]
  },
  faq: {
    type: [FaQSchema]
  },
  testimonial: {
    type: [testimonialSchema]
  },
  ourMission: {
    type: [ourMissionSchema]
  },
  partners: {
    type: [partnerSchema],
  },
  sellingPlatform: {
    type: [sellingPlatformSchema],
  },
  platformVideos: {
    type: [platformVideosSchema],
  },
  visits: {
    type: [visitsSchema],
  },
}, 
{ 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
 }
); // Add timestamps for createdAt and updatedAt

  
const Platform = mongoose.model('Platform', PlatformSchema);  

export default Platform;
