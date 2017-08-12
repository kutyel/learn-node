exports.homePage = (req, res) =>
  res.render('index', req.query)

exports.addStore = (req, res) =>
  res.render('edit', { title: 'Add Store' })

exports.createStore = (req, res) =>
  res.json(req.body)
