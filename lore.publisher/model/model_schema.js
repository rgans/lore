var extend = require('util')._extend;
var String = require('./types/string');
var Number = require('./types/number');
var Boolean = require('./types/boolean');
var Array = require('./types/array');
var Email = require('./types/email');
var Guid = require('./types/guid');
var ServiceResult = require('../services/service_result');
var Fault = require('../services/fault');

var modelSchema = function (schema) {

    var define = function (data)
    {
        this._error = null;
        this._schema = schema ? schema : {};
        this._schema_keys = Object.keys(this._schema);
        
        this._load_model(data);
    };

    define.prototype._load_model = function(model_data) {
        for(var idx = 0; idx < this._schema_keys.length; idx++)
        {
            var key = this._schema_keys[idx];
            var val = model_data[key];
            if (val !== 'undefined')
                this[key] = val;
        }
    };

    define.prototype._get_field = function(key) {
        var schema = this._schema[key];
        var field = {
            value: this[key],
            is_empty: this[key] === 'undefined' || this[key] === '',
            is_required: schema['required'] === true,
            length: { min: null, max: null },
            message: { required:'field required' }
        };
        
        field.length = extend(field.length, schema['length']);
        field.message = extend(field.length, schema['message']);
        
        return field;
    };

    define.prototype._validate = function () {
        for(var idx = 0; idx < this._schema_keys.length; idx++)
        {
            var key = this._schema_keys[idx];
            var field = this._get_field(key);

            if(field.is_required && field.is_empty)
                this._add_error(key, field.message.required);
        }
    };
    
    define.prototype._add_error = function(key, value) {
        if(!this._error) this._error = {};
        if(!this._error[key]) this._error[key] = [];
        this._error[key].push(value);
    };

    define.prototype.is_valid = function () {
        this._validate();
        return this._error === null;
    };

    define.prototype.fault_result = function (code, reason) {
        return new ServiceResult({fault: {}});
    };

    define.prototype.validation_error_result = function () {
        return new ServiceResult(new Fault('model_validation', 'Some field are invalid', this._error));
    };

    define.prototype.success_result = function (data) {
        return new ServiceResult({result: data});
    };

    define.prototype.create_result = function (result) {
        return new ServiceResult(result);
    };

    return define;
};

module.exports = modelSchema;