// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chart2Schema = new Schema({
    username:{ type: String, required: true },
    updatedate:{ type: String, required: true },
    subject:{ type: String, required: true },
    year:{ type: String, required: true },
    data1:{ type: String, required: true },
    data2:{ type: String, required: true }
});

// we need to create a model using it
var Chart2 = mongoose.model('Chart2', chart2Schema);

// make this available to our users in our Node applications
module.exports = Chart2;