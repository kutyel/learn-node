const express = require('express')
const router = express.Router()
const storeCtrl = require('../controllers/store')
const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', catchErrors(storeCtrl.getStores))
router.get('/stores', catchErrors(storeCtrl.getStores))
router.get('/add', storeCtrl.addStore)
router.post('/add', catchErrors(storeCtrl.createStore))

module.exports = router
