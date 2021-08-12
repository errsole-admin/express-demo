var errsole = require('errsole')
errsole.initialize({
  token: '523caaa8-dcae-412d-a71f-8aa1e04c3e26'
})

var express = require('express')
var fs = require('fs')
var multer = require('multer')
var path = require('path')

var upload = multer({ dest: 'files/' })

var app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/get-request', function (req, res) {
  // Remove the below line
  res.locals.name = req.query.name || 'World'
  res.render('index')
})

app.get('/get-json', function (req, res) {
  // Change sample.json to sample.zip
  var file = path.join(__dirname, 'files/sample.json')
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      res.status(500).send(err.message || err.toString())
    } else {
      res.send(JSON.parse(data))
    }
  })
})

app.post('/post-request', function (req, res) {
  // Remove this line: app.use(express.json())
  var sum = req.body[0] + req.body[1]
  res.send(sum)
})

app.post('/upload-file', upload.single('photo'), function (req, res) {
  // Edit request and rename picture to photo
  res.send(req.file.filename)
})

app.get('/download-file', function (req, res) {
  // Change files/sample.zip to sample.zip
  var file = path.join(__dirname, 'files/sample.zip')
  res.download(file)
})

app.listen(errsole.wrapPort(3000))