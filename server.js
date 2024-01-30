/**
 * Put this Errsole code snippet at the top of your app's main file
 */
const errsole = require('errsole');
errsole.initialize({
  framework: 'express',
  token: process.env.ERRSOLE_TOKEN,
  editCode: true,
  evalExpression: true
});
// End of Errsole code snippet

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/get-request', function (req, res) {
  console.log('GET', '/get-request');
  res.locals.name = req.query.name;
  res.render('index');
});

app.get('/get-json', function (req, res) {
  console.log('GET', '/get-json');
  const file = path.join(__dirname, 'files/sample.zip');
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      res.status(500).send(err.message || err.toString());
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post('/post-request', function (req, res) {
  console.log('POST', '/post-request');
  const sum = req.body.input[0] * req.body.input[1];
  res.send(sum.toString());
});

app.get('/download-file', function (req, res) {
  console.log('GET', '/download-file');
  const file = path.join(__dirname, 'sample.zip');
  res.download(file);
});

app.all('*', function (req, res) {
  res.send({});
});

app.listen(14874);
