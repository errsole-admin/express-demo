var errsole = require('errsole')
var express = require('express')
var multer = require('multer')
var path = require('path')

errsole.initialize({
  token: '523caaa8-dcae-412d-a71f-8aa1e04c3e26'
})
var upload = multer({ dest: 'files/' })

var app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/get-request', function (req, res) {
  // Remove the below line to generate an error
  res.locals.name = req.query.name || 'World'
  res.render('index')
})

app.post('/post-request', function (req, res) {
  // Remove this line to generate an error: app.use(express.json())
  var sum = req.body[0] + req.body[1]
  res.send(sum)
})

app.post('/upload-file', upload.single('photo'), function (req, res) {
  // Edit request and rename picture to photo
  res.send(req.file.filename)
})

app.get('/download-file', function (req, res) {
  var file = path.join(__dirname, 'files/sample.zip')
  res.download(file)
})

app.listen(3000)
