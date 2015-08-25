var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;
var addressSchema = require('./address_entity');
var contactSchema = require('./contact_entity');

var buildingSchema = new schema({
    name: {type: String, required: true},
    address: {type: mongoose.Schema.ObjectId, ref: 'address'},
    contact: [contactSchema]
});

var campusSchema = new schema({
    name: {type: String, required: true},
    building: [buildingSchema]
});

var institutionSchema = new schema({
    name: {type: String, required: true},
    campus: [campusSchema]
});

module.exports = mongoose.model('institution', institutionSchema);