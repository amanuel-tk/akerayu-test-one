const mongoose = require('mongoose')
// const user = require('./userModel')

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    //   required: true
  },
  size: {
    type: Number,
    //   required: true
  },
});

const favoriteSchema = mongoose.Schema({
  favoriteBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
},
  { timestamps: true })

const viewSchema = mongoose.Schema({
  ipAddress: {
    type: String,

  },
},
  { timestamps: true })

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Provide Title"]
  },
  price: {
    type: Number,
    required: [true, "Please Set Price"]
  },
  description: {
    type: String,

  },
  locationName: {
    type: String,

  },
  exactLocation: {
    type: Boolean,

  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: [true, 'Please provide the coordinates.'],
    },
  },
  selectedImages: [imageSchema],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  homeType: [{
    type: String,
    required: [true, "Please Choose Something That Describes Your Home Best."]
  }],
  propertyFor: {
    type: String,
    required: [true, "Please Select What You Want With Your Property."]
  },
  bedRoom: {
    type: Number,
    default: 0
  },
  bathRoom: {
    type: Number,
    default: 0
  },
  kitchen: {
    type: Number,
    default: 0
  },
  kitchenShared: {
    type: Boolean,
    default: 0
  },
  bathroomShared: {
    type: Boolean,
    default: 0
  },
  utility: [{
    type: String,
    default: "N/A"
  }],
  phoneNumber: {
    type: Number,
    default: null
  },
  facebook: {
    type: String,
    default: null
  },
  whatsApp: {
    type: String,
    default: null
  },
  telegram: {
    type: String,
    default: null
  },
  favorite: [favoriteSchema],
  view: [viewSchema],
  status: {
    type: String,
    required: true
  }

},
  {
    timestamps: true
  })
productSchema.index({ location: '2dsphere' }, { sparse: true });
module.exports = mongoose.model("Product", productSchema)
