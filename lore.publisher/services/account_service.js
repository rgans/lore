var config = require_r('./app.config');
var BaseService = require('./base_service');
var util = require('util');

function AccountService() {
    BaseService.apply(this, arguments);
    
    this._namespace = config.services.dataaccess.namespace;
}

util.inherits(AccountService, BaseService);

AccountService.prototype.signup = function(data, callback)
{
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

module.exports = AccountService;