const mongoose = require('mongoose')

const Review = mongoose.model('Review')

exports.addReview = async (req, res) => {
  req.body.author = req.user._id
  req.body.store = req.params.id
  const review = new Review(req.body)
  await review.save()
  req.flash('success', 'Review saved!')
  res.redirect('back')
}
