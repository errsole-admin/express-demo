/**
 * Insert this Errsole code snippet as the first line of your app's main file
 */
const errsole = require('@errsole/node');
errsole.initialize({
  framework: 'express',
  token: process.env.ERRSOLE_TOKEN,
  exitOnException: true,
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
  try {
    const sum = req.body.input[0] * req.body.input[1];
    res.send(sum.toString());
  } catch (err) {
    errsole.meta({ 'req.headers': req.headers, 'req.body': req.body }).error(err);
    res.status(500).send(err.toString());
  }
});

app.get('/download-file', function (req, res) {
  console.log('GET', '/download-file');
  const file = path.join(__dirname, 'sample.zip');
  res.download(file);
});

app.get('/api/users/123/profile', function (req, res) {
  setTimeout(function () {
    res.send({});
  }, 2722);
});
app.get('/api/products/456/details', function (req, res) {
  setTimeout(function () {
    res.send({});
  }, 3199);
});
app.get('/api/orders/789/status', function (req, res) {
  setTimeout(function () {
    res.send({});
  }, 2407);
});
app.get('/api/carts/1234/items', function (req, res) {
  setTimeout(function () {
    res.send({});
  }, 3319);
});
app.get('/api/notifications/user/321', function (req, res) {
  setTimeout(function () {
    res.send({});
  }, 1093);
});
app.post('/api/auth/login', function (req, res) {
  setTimeout(function () {
    res.status(201).send({});
  }, 1334);
});
app.post('/api/auth/register', function (req, res) {
  setTimeout(function () {
    res.status(201).send({});
  }, 2493);
});
app.post('/api/payments/checkout', function (req, res) {
  setTimeout(function () {
    res.status(201).send({});
  }, 1467);
});
app.post('/api/reviews/987/product/654', function (req, res) {
  setTimeout(function () {
    res.status(201).send({});
  }, 1908);
});
app.put('/api/shipping/address/5678', function (req, res) {
  setTimeout(function () {
    res.send({});
  }, 3968);
});

app.all('*', function (req, res) {
  res.send({});
});

app.listen(14874);
