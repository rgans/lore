var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;
var addressSchema = require('./address_entity');
var contactSchema = require('./contact_entity');
var userSchema = require('./user_entity');

var personSchema = new schema({
    name: {type: String, required: true},
    contact: [contactSchema],
    address: {type: mongoose.Schema.ObjectId, ref: addressSchema.collection_name},
    user: {type: mongoose.Schema.ObjectId, ref: userSchema.collection_name}
});

var entity = { collection_name: 'person' };

entity.model = mongoose.model(entity.collection_name, personSchema);

module.exports = entity;