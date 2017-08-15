const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.addStore = (req, res) =>
  res.render('edit', { title: 'Add Store' })

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save()
  req.flash('success', `Successfully created ${store.name}. Please leave a review!`)
  res.redirect(`/store/${store.slug}`)
}

exports.getStores = async (req, res) =>
  res.render('stores', { title: 'Stores', stores: await Store.find() })
