var config = require_r('/config');
var ServiceResult = require('./serviceresult');
var validator = require('./datavalidator');
var queryparser = require('./queryparser');
var BaseService = require('./baseservice');
var util = require('util');

function InstitutionService() {
    BaseService.apply(this, arguments);
    
    this._namespace = config.services.dataaccess.namespace;
}

util.inherits(InstitutionService, BaseService);

InstitutionService.prototype.find = function(criteria, onFinished, onError){
    var url = new queryparser(criteria).parse(config.services.dataaccess.institution);

    this.get(url, 
    function(err, res, result) {
        if(err) {
            onError(err);
        } else {
            onFinished(new ServiceResult(result));
        }
    });
};

InstitutionService.prototype.findById = function(id, onFinished, onError){
    return this.find({ identifier: id }, onFinished, onError);
};

InstitutionService.prototype.create = function(data, onFinished, onError){
    var fault = new validator({ 
        fields:{ 
            name: { required:true, type:'string' }
        },
        messages:{
            name: { required:'Nome eh obligatolio'  }
        }
    }).validate(data);

    if(fault) {
        var result = new ServiceResult();
        result.fault = fault;
        onFinished(result);
    } else {
        this.post(config.services.dataaccess.institution, { json: data }, 
        function(err, res, result) {
            if(err) {
                onError(err);
            } else {
                onFinished(new ServiceResult(result));
            }
        });
    }
};

InstitutionService.prototype.save = function(id, data, onFinished, onError){
    var fault = new validator({ 
        fields:{ 
            name: { required:true, type:'string' }
        },
        messages:{
            name: { required:'Nome eh obligatolio'  }
        }
    }).validate(data);

    if(fault) {
        var result = new ServiceResult();
        result.fault = fault;
        onFinished(result);
    } else {
        var url = new queryparser({ identifier: id }).parse(config.services.dataaccess.institution);
        this.put(url, { json: data }, 
        function(err, res, result) {
            if(err) {
                onError(err);
            } else {
                onFinished(new ServiceResult(result));
            }
        });
    }
};

InstitutionService.prototype.remove = function(id, onFinished, onError){
    var url = new queryparser({ identifier: id }).parse(config.services.dataaccess.institution);
    this.delete(url, 
    function(err, res, result) {
        if(err) {
            onError(err);
        } else {
            onFinished(new ServiceResult(result));
        }
    });
};

module.exports = InstitutionService;