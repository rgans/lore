var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;

var permissionSchema = new schema({
    code: {type: String, required: true},
    name: {type: String},
    description: {type: String}
});

var entity = { collection_name: 'permission' };

entity.model = mongoose.model(entity.collection_name, permissionSchema);

module.exports = entity;