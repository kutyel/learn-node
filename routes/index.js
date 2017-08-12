const express = require('express')
const router = express.Router()
const storeCtrl = require('../controllers/store')

router.get('/', storeCtrl.homePage)
router.get('/add', storeCtrl.addStore)
router.post('/add', storeCtrl.createStore)

module.exports = router
