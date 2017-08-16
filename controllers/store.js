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

exports.editStore = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id })
  // TODO: confirm they are the owner of the store
  res.render('edit', { title: `Edit ${store.name}`, store })
}

exports.updateStore = async (req, res) => {
  const store = await Store.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  ).exec()
  req.flash('success', `Successfully updated <strong>${store.name}</strong>! <a href="/stores/${store.slug}">View Store</a>`)
  res.redirect(`/stores/${store._id}/edit`)
}
