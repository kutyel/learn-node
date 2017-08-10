const express = require('express')
const router = express.Router()
const storeCtrl = require('../controllers/store')

router.get('/', storeCtrl.homePage)

module.exports = router
