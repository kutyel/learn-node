const slug = require('slugs')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const schema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    trim: true,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [
      {
        type: Number,
        required: 'You must supply coordinates!',
      },
    ],
    address: {
      type: String,
      required: 'You must supply an address!',
    },
  },
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!',
  },
  photo: String,
  slug: String,
  tags: [String],
})

schema.pre('save', async function(next) {
  this.isModified('name') && (this.slug = slug(this.name))
  const slugRegExp = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
  const storesWithSlug = await this.constructor.find({ slug: slugRegExp })
  storesWithSlug.length &&
    (this.slug = `${this.slug}-${storesWithSlug.length + 1}`)
  next()
})

schema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ])
}

module.exports = mongoose.model('Store', schema)
