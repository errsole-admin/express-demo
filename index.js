const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'files/' });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/get-request', function (req, res) {
  // Remove "world" from the below line
  res.locals.name = req.query.name || 'world';
  res.render('index');
});

app.get('/get-json', function (req, res) {
  // Change "files/sample.json" to "files/sample.zip" in the below line
  const file = path.join(__dirname, 'files/sample.json');
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      res.status(500).send(err.message || err.toString());
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post('/post-request', function (req, res) {
  // Make the request body an array of two numbers
  const sum = req.body.input[0] * req.body.input[1];
  res.send(sum.toString());
});

app.post('/upload-file', upload.single('photo'), function (req, res) {
  // Set file name as "picture" in the request body
  res.send(req.file.filename);
});

app.get('/download-file', function (req, res) {
  // Change "files/sample.zip" to "sample.zip" in the below line
  const file = path.join(__dirname, 'files/sample.zip');
  res.download(file);
});

app.all('*', function (req, res) {
  res.send({});
});

app.listen(14482);
