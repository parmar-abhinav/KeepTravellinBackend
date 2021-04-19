var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Destination = new Schema({
    Name:   {
        type: String,
        default: '',
        unique: false
    },
    Description: {
        type: String,
        default: '',
        unique: false
    },
    Besttime: {
        type: String,
        default: '',
        unique: false
    },
    Uri: {
        type: String,
        default: '',
        unique: false
    },
    Youtube: {
        type: String,
        default: '',
        unique: false
    }
});

Destination.plugin(passportLocalMongoose);

module.exports = mongoose.model('Destination', Destination);