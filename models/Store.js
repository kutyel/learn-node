const slug = require('slugs')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const schema = new mongoose.Schema({
  description: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!'
  },
  slug: String,
  tags: [String]
})

schema.pre('save', function (next) {
  // TODO: make more resilient so that slugs are unique
  this.isModified('name') && (this.slug = slug(this.name))
  next()
})

module.exports = mongoose.model('Store', schema)
