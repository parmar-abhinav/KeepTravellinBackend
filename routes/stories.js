var express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
var storiesRouter = express.Router();
storiesRouter.use(bodyParser.json());
const mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('../authenticate');
var Stories = require('../models/stories');
const { response } = require('../app');

var uri = config.uriFirst + config.dbname + config.uriLast
const connect = mongoose.connect(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
});

storiesRouter.get('/', async (req, res) => {
  Stories.find((err, story) => {
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

storiesRouter.post('/', (req, res) => {
  console.log(req.body);
  Stories.insertMany({
    Name: req.body.firstname + " " + req.body.lastname,
    Title: req.body.Title,
    Description: req.body.Description
}, (err, services) => {
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
        res.json({ success: true, status: 'Story Inserted Successfully!' });
    }
})
})

module.exports = storiesRouter;


