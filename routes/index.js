const authCtrl = require('../controllers/auth')
const express = require('express')
const router = express.Router()
const storeCtrl = require('../controllers/store')
const userCtrl = require('../controllers/user')
const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', catchErrors(storeCtrl.getStores))
router.get('/stores', catchErrors(storeCtrl.getStores))
router.get('/add', authCtrl.isLoggedIn, storeCtrl.addStore)

router.post(
  '/add',
  storeCtrl.upload,
  catchErrors(storeCtrl.resize),
  catchErrors(storeCtrl.createStore)
)

router.post(
  '/add/:id',
  storeCtrl.upload,
  catchErrors(storeCtrl.resize),
  catchErrors(storeCtrl.updateStore)
)

router.get('/stores/:id/edit', catchErrors(storeCtrl.editStore))
router.get('/store/:slug', catchErrors(storeCtrl.getStoreBySlug))

router.get('/tags', catchErrors(storeCtrl.getStoresByTag))
router.get('/tags/:tag', catchErrors(storeCtrl.getStoresByTag))

router.get('/login', userCtrl.loginForm)
router.get('/register', userCtrl.registerForm)

router.post('/login', authCtrl.login)
router.post(
  '/register',
  userCtrl.validateRegister,
  catchErrors(userCtrl.register),
  authCtrl.login
)

router.get('/logout', authCtrl.logout)

module.exports = router
