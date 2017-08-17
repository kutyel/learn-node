const slug = require('slugs')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const schema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    trim: true
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [
      {
        type: Number,
        required: 'You must supply coordinates!'
      }
    ],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
  },
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!'
  },
  photo: String,
  slug: String,
  tags: [String]
})

schema.pre('save', function (next) {
  // TODO: make more resilient so that slugs are unique
  this.isModified('name') && (this.slug = slug(this.name))
  next()
})

module.exports = mongoose.model('Store', schema)
