var Fault = require('./fault');

var ServiceResult = function(data, error)
{
    if(data instanceof Fault) {
        error = data;
        data = null;
    }

    this.result = data;
    this.fault = error;
};

module.exports = ServiceResult;