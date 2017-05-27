// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chart4Schema = new Schema({
    username:{ type: String, required: true },
    updatedate:{ type: String, required: true },
    data1:{ type: String, required: true },
    data2:{ type: String, required: true },
    data3:{ type: String, required: true },
    dataval1:{ type: String, required: true },
    dataval2:{ type: String, required: true },
    dataval3:{ type: String, required: true }
});

// we need to create a model using it
var Chart4 = mongoose.model('Chart4', chart4Schema);

// make this available to our users in our Node applications
module.exports = Chart4;