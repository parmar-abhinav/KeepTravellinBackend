var express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
var userRouter = express.Router();
userRouter.use(bodyParser.json());
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

userRouter.get('/',passport.authenticate('local'), async (req, res) => {
    console.log("Incoming check user request");
    Requests.find((err, places) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            client.close();
        }
        else {
            console.log(places);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, check: places });
            client.close();
        }
    })

});

userRouter.get('/:id', passport.authenticate('local'),async (req, res) => {
    console.log("Incoming delete user request");
    Requests.deleteOne({_id: req.params.id}, (err, places) => {
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

module.exports = userRouter;


