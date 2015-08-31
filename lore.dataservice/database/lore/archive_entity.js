var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;

var archiveSchema = new schema({
    code: {type: String, required: true},
    name: {type: String},
    description: {type: String}
});

var entity = { collection_name: 'archive' };

entity.model = mongoose.model(entity.collection_name, archiveSchema);

module.exports = entity;