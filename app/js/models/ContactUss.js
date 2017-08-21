// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactusSchema = new Schema({
    userid:{ type: String, required: false },
    date:{ type: String, required: true },
    text:{ type: String, required: true },
    responded:{ type: String, required: true },
    action:{ type: String, required: true },
    actiondate:{ type: String, required: true }
});

// we need to create a model using it
var ContactUs = mongoose.model('ContactUs', contactusSchema);

// make this available to our users in our Node applications
module.exports = ContactUs;