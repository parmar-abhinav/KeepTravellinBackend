var express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
var wishesRouter = express.Router();
wishesRouter.use(bodyParser.json());
const mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('../authenticate');
var Wishes = require('../models/wishes');
const { response } = require('../app');

var uri = config.uriFirst + config.dbname + config.uriLast
const connect = mongoose.connect(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
});

wishesRouter.get('/', async (req, res) => {
    Wishes.find((err, story) => {
      if(err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, story: story})
      }
    })
    
  });



  wishesRouter.get('/:id', async (req, res) => {
    Wishes.deleteOne({_id: req.params.id}, (err, places) => {
      if (err) {
          res.statusCode = 500;
          client.close();
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: err });
      }
      else {
          client.close();
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, check: places });
          client.close();
      }
    })
  });
  

wishesRouter.post('/', (req, res, next) => {
    Wishes.insertMany({
        _id: req.body._id,
        service: req.body.service,
        name: req.body.name,
        mobnumber: req.body.mobnumber,
        hotelname: req.body.hotelname,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        busname: req.body.busname,
        source: req.body.source,
        destination: req.body.destination,
        flightname: req.body.flightname,
        radio1: req.body.radio1,
        ristorantename: req.body.ristorantename,
        username: req.body.username,
        date: req.body.date,
        time: req.body.time,
        touristusername: req.body.touristusername
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
            res.json({ success: true, status: 'Service Inserted Successfully!' });
        }
    })
});

module.exports = wishesRouter;