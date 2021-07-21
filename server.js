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
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/get-request', function (req, res) {
  res.render('index')
})

app.post('/post-request', function (req, res) {
  var sum = req.body[0] + req.body[1]
  res.send(sum)
})

app.post('/upload-file', upload.single('photo'), function (req, res) {
  res.send(req.file.filename)
})

app.get('/download-file', function (req, res) {
  var file = path.join(__dirname, 'files/sample.zip')
  res.download(file)
})

app.listen(3000)
