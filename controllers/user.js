const mongoose = require('mongoose')
const promisify = require('es6-promisify')
const User = mongoose.model('User')

exports.loginForm = (req, res) =>
  res.render('login', { title: 'Login' })

exports.registerForm = (req, res) =>
  res.render('register', { title: 'Register' })

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name')
  req.checkBody('name', 'You must supply a name!').notEmpty()
  req.checkBody('email', 'That email is not valid!').isEmail()
  req.sanitizeBody('email').normalizeEmail()
  req.checkBody('password', 'You must supply a password!').notEmpty()
  req.checkBody('password-confirm', 'Confirmed password cannot be blank!').notEmpty()
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equal(req.body.password)
  const errors = req.validationErrors()
  if (errors) {
    req.flash('error', errors.map(err => err.msg))
    res.render('register', { title: 'Register', body: req.body, flashes: req.flash() })
  } else {
    next()
  }
}

exports.register = async (req, res, next) => {
  const user = new User({ name: req.body.name, email: req.body.email })
  const register = promisify(User.register, User)
  await register(user, req.body.password)
  next()
}
