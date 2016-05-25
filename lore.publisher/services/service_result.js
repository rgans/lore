var extend = require('util')._extend;
var Fault = require('./fault');

var ServiceResult = function(data, error)
{
    if(data instanceof Fault) {
        error = data;
        data = null;
    } else {
        extend(this, data);
        this.fault = error;
    }
};

module.exports = ServiceResult;