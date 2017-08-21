// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var examyearsSchema = new Schema({
    sublevel:{ type: String, required: true },
    years:{ type: String, required: true }
});

// we need to create a model using it
var Examyears = mongoose.model('Examyears', examyearsSchema);

// make this available to our users in our Node applications
module.exports = Examyears;