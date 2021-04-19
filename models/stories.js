var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Stories = new Schema({
    Name:   {
        type: String,
        default: ''
    },
    Title: {
        type: String,
        default: ''
    },
    Description: {
        type: String,
        default: ''
    }
});

Stories.plugin(passportLocalMongoose);

module.exports = mongoose.model('Stories', Stories);