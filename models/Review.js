const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const schema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply and author!',
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    required: 'You must supply a store!',
  },
  text: {
    type: String,
    required: 'Your review must have a text!',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
})

function autoPopulate(next) {
  this.populate('author')
  next()
}

schema.pre('find', autoPopulate)
schema.pre('findOne', autoPopulate)

module.exports = mongoose.model('Review', schema)
