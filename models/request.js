
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Requests = new Schema({
    username:   {
        type: String,
        default: '',
        unique: false
    },
    service: {
        type: String,
        default: '',
        unique: false
    },
    touristusername: {
        type: String,
        default: '',
        unique: false
    },
    firstname: {
        type: String,
        default: '',
        unique: false
    },
    lastname: {
        type: String,
        default: '',
        unique: false
    },
    email: {
        type: String,
        default: '',
        unique: false
    },
    mobnumber: {
        type: String,
        default: '',
        unique: false
    }
});

Requests.plugin(passportLocalMongoose);

module.exports = mongoose.model('Requests', Requests);