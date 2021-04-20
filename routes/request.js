var express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
var requestRouter = express.Router();
requestRouter.use(bodyParser.json());
const mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('../authenticate');
var Requests = require('../models/request');
const { response } = require('../app');

var uri = config.uriFirst + config.dbname + config.uriLast
const connect = mongoose.connect(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
});


requestRouter.post('/', passport.authenticate('local'),(req, res, next) => {
    console.log(req.body);
    Requests.insertMany({
        username: req.body.username,
        service: req.body.service,
        touristusername: req.body.touristusername,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobnumber: req.body.mobnumber
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
            res.json({ success: true, status: 'Call has been requested' });
        }
    })
});

module.exports = requestRouter;


