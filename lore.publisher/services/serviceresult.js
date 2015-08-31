var config = require_r('/config');
var Fault = require('./fault');
var extend = require('util')._extend;

var serviceresult = function(data) {

    var result = { data:null };
    
    if(typeof data !== 'object') {
        try {
            data = JSON.parse(data);
        } catch (ex) {
            console.log('The response is not JSON', data);
            result.data = data;
            return result;
        }
    }

    result.data = extend(data.result, result.data);
    if(data.fault) {
        var message = data.fault.localizedMessages['pt-BR'];
        
        result.fault = [new Fault(data.fault.faultCode, message)];
    }
    
    return result;
};

module.exports = serviceresult;