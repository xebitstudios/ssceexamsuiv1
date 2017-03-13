// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  created_at: { type: Date, required: false, default: Date.now },
  updated_at: { type: Date, required: false, default: Date.now }
});

userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude';
  return this.name;
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;