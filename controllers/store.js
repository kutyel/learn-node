const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.homePage = (req, res) =>
  res.render('index', req.query)

exports.addStore = (req, res) =>
  res.render('edit', { title: 'Add Store' })

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save()
  req.flash('success', `Successfully created ${store.name}. Please leave a review!`)
  res.redirect(`/store/${store.slug}`)
}
