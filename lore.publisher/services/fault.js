var Fault = function(code, reason, message)
{
    this.code = code;
    this.reason = reason;
    this.message = {
        'pt-BR': message
    };
};

module.exports = Fault;