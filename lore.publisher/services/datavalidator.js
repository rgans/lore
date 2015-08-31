var config = require_r('/config');
var Fault = require('./fault');
var extend = require('util')._extend;

var datavalidator = function(options) {
    if(options === null || typeof options !== 'object')
        throw new Error('Options is required!');

    this._val = {
        required: 'required', 
        type:'type', 
        minlength:'minlength',
        maxlength:'maxlength', 
        regex:'regex'
    };

    var op = {
        fields: {},
        messages: {}
    };
    
    this._options = extend(op, options);
};

datavalidator.prototype.validate = function(data) {
    if(data === null || typeof data !== 'object')
        throw new Error('Data is required!');

    var fields = this._options['fields'];
    var faults = [];

    var keys = Object.keys(fields);
    for(var i in keys) {
        var key = keys[i];
        var validations = fields[key];
        var kValue = data[key];
        var kType = typeof kValue;

        if(validations[this._val.required]) {
            if(!kValue || typeof kValue === 'undefined' || kValue === '') {
                var fault = new Fault('The field ' + key + ' is required');
                fault.fieldName = key;
                faults.push(fault);
            }
        }
    }

    return faults.length > 0 ? faults : null;
};

module.exports = datavalidator;