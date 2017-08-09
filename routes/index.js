const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>
  res.render('main', req.query))

router.get('/reverse/:name', (req, res) =>
  res.send(req.params.name.split('').reverse().join('')))

module.exports = router
