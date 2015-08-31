var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;
var buildingSchema = require('./building_entity');
var addressSchema = require('./address_entity');

var campusSchema = new schema({
    name: {type: String, required: true},
    //building: [{type: mongoose.Schema.ObjectId, ref: buildingSchema.collection_name}],
    //address: {type: mongoose.Schema.ObjectId, ref: addressSchema.collection_name}
});

module.exports = mongoose.model('campus', campusSchema);