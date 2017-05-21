// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chart1Schema = new Schema({
    username:{ type: String, required: true },
    updatedate:{ type: String, required: true },
    dataval1:{ type: String, required: true },
    year:{ type: String, required: true },
    data:{ type: String, required: true }
});

// we need to create a model using it
var Chart1 = mongoose.model('Chart1', chart1Schema);

// make this available to our users in our Node applications
module.exports = Chart1;