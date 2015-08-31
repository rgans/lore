var config = require_r('/config');
var BaseService = require('./baseservice');
var util = require('util');

function SecurityService() {
    BaseService.apply(this, arguments);
}

util.inherits(SecurityService, BaseService);

SecurityService.prototype.authtoken = function(callback){
};

SecurityService.prototype.registerconsumer = function(){
};

module.exports = new SecurityService();