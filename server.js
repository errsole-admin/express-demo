/**
 * Put this Errsole code snippet at the top of your app's main file
 */
const errsole = require('errsole')
errsole.initialize({
  framework: 'express',
  token: '523caaa8-dcae-412d-a71f-8aa1e04c3e26'
})
// End of Errsole code snippet

var express = require('express')
var fs = require('fs')
var multer = require('multer')
var path = require('path')

var upload = multer({ dest: 'files/' })

var app = express()

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/get-request', function (req, res) {
  res.render('index')
})

app.get('/get-json', function (req, res) {
  var file = path.join(__dirname, 'files/sample.zip')
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      res.status(500).send(err.message || err.toString())
    } else {
      res.send(JSON.parse(data))
    }
  })
})

app.post('/post-request', function (req, res) {
  var sum = req.body[0] + req.body[1]
  res.send(sum)
})

app.post('/upload-file', upload.single('photo'), function (req, res) {
  res.send(req.file.filename)
})

app.get('/download-file', function (req, res) {
  var file = path.join(__dirname, 'sample.zip')
  res.download(file)
})

app.listen(errsole.wrapPort(3000))
