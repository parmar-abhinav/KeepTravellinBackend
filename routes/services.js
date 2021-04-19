var express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
var servicesRouter = express.Router();
servicesRouter.use(bodyParser.json());
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

servicesRouter.get('/', async (req, res) => {
    Services.find((err, story) => {
      if(err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(story);
        res.end();
      }
    })
    
  });



  servicesRouter.get('/:id', async (req, res) => {
    Services.deleteOne({_id: req.params.id}, (err, places) => {
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
  

servicesRouter.post('/', (req, res, next) => {
  console.log(req.body);
    Services.insertMany({
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
        time: req.body.time
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

module.exports = servicesRouter;