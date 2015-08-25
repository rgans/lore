var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;

var contactSchema = new schema({
    type: {type: String, required: true, enum: ['email', 'homephone', 'workphone', 'cellphone', 'whatsapp']},
    value: {type: String, required: true}
});

module.exports = mongoose.model('contact', contactSchema);