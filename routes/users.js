var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
var router = express.Router();
router.use(bodyParser.json());
const mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('../authenticate');


var uri = config.uriFirst + config.dbname + config.uriLast
const connect = mongoose.connect(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',(req, res, next) => {
  User.register(new User({username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, usertype: req.body.usertype, mobnumber: req.body.mobnumber}), 
  req.body.password, (err, user) => {
    if(err) {
      client.close();
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        client.close();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {

  var token = authenticate.getToken({_id: req.user._id});
  client.close();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, usertype: res.req.user.usertype, status: 'You are successfully logged in!'});
});

module.exports = router;
