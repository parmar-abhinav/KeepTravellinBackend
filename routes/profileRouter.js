var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
var profileRouter = express.Router();
profileRouter.use(bodyParser.json());
const mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('../authenticate');

var uri = config.uriFirst + config.dbname + config.uriLast
const connect = mongoose.connect(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
});

profileRouter.get('/:username',authenticate.verifyUser, (req, res) => {
  console.log(req.params.username)
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, err: err });
      res.end();
      client.close();
    }
    else if (user) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, user: user });
      res.end();
      client.close();
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, user: null });
      res.end();
      client.close();
    }
  });
});

profileRouter.post('/', authenticate.verifyUser,(req, res) => {
  console.log(req.body);
  User.updateOne({ username: req.body.username }, { $set: { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email } }, (err, user) => {
    if (err) {
      client.close();
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    }
    else {
      client.close();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, status: 'Profile Update Successfully' });
    }
  })
})

module.exports = profileRouter;