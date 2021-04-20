var express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
var tripRouter = express.Router();
tripRouter.use(bodyParser.json());
const mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('../authenticate');
var Services = require('../models/services');
const { response } = require('../app');

var uri = config.uriFirst + config.dbname + config.uriLast
const connect = mongoose.connect(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
});

tripRouter.get('/',authenticate.verifyUser, async (req, res) => {
  Services.find((err, story) => {
    if(err) {
      client.close();
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      client.close();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.send(story);
      res.end();
    }
  })
  
});

module.exports = tripRouter;


