var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Services = new Schema({
    service:   {
        type: String,
        default: 'select'
    },
    name: {
        type: String,
        default: ''
    },
    mobnumber: {
        type: String,
        default: ''
    },
    hotelname: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    pincode: {
        type: String,
        default: ''
    },
    busname: {
        type: String,
        default: ''
    },
    source: {
        type: String,
        default: ''
    },
    destination: {
        type: String,
        default: ''
    },
    flightname: {
        type: String,
        default: ''
    },
    radio1: {
        type: String,
        default: ''
    },
    ristorantename: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        default: ''
    },
    date: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: ''
    }
});

Services.plugin(passportLocalMongoose);

module.exports = mongoose.model('Services', Services);