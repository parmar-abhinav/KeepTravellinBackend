var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {
        type: String
    },
    firstname:   {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    usertype: {
        type: String,
        default: ''
    },
    mobnumber: {
        type: String,
        default: ''
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);