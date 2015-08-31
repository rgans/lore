var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;
var contactSchema = require('./contact_entity');

var buildingSchema = new schema({
    name: {type: String, required: true},
    contact: [contactSchema.model]
});

var entity = { collection_name: 'building' };

entity.model = mongoose.model(entity.collection_name, buildingSchema);

module.exports = entity;