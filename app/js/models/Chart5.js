// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chart5Schema = new Schema({
    username:{ type: String, required: true },
    name1:{ type: String, required: true },
    y1:{ type: String, required: true },
    name2:{ type: String, required: true },
    y2:{ type: String, required: true },
    subject:{ type: String, required: true },
    sliced:{ type: String, required: true },
    selected:{ type: String, required: true }
});

// we need to create a model using it
var Chart5 = mongoose.model('Chart5', chart5Schema);

// make this available to our users in our Node applications
module.exports = Chart5;