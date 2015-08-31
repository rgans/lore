var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;

var studentSchema = new schema({
    location: {type: String, required: true},
    district: {type: String, required: true},
    province: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    postcode: {type: String, minlength: 8, maxlength: 8}
});

var entity = { collection_name: 'student' };

entity.model = mongoose.model(entity.collection_name, studentSchema);

module.exports = entity;