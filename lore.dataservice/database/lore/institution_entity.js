var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;
var campusSchema = require('./campus_entity');

var institutionSchema = new schema({
    name: {type: String, required: true},
    //campus: [campusSchema]
    campus: [{type: mongoose.Schema.Types.ObjectId, ref: campusSchema.modelName}]
}
//, { collection: 'institution' }
);

module.exports = mongoose.model('institution', institutionSchema);