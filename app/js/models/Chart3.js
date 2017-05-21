// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chart3Schema = new Schema({
    username:{ type: String, required: true },
    updatedate:{ type: String, required: true },
    year:{ type: String, required: true },
    data1:{ type: String, required: true },
    data2:{ type: String, required: true }
});

// we need to create a model using it
var Chart3 = mongoose.model('Chart3', chart3Schema);

// make this available to our users in our Node applications
module.exports = Chart3;