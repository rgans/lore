var ModelSchema = require('./model_schema');
var AccountService = require('../services/account_service');

var signup = new ModelSchema({
    first_name: {
        type: String, required: true, length: { min:2, max:15 }, 
        message: {
            required: 'Por favor preencha o nome',
            length: 'O nome deve ter entre 2 e 5 caracteres'
        }
    },
    last_name: {
        type: String, required: true, length: { min:2, max:30 }, 
        message: {
            required: 'Por favor preencha o sobre nome',
            length: 'O nome deve ter entre 2 e 30 caracteres'
        }
    },
    email: {
        type: String, required: true, length: { min:2, max:30 }, 
        message: {
            required: 'Por favor preencha o email',
            length: 'O email deve ter entre 2 e 30 caracteres'
        }
    },
    password: {
        type: String, required: true, length: { min:6, max:12 }, 
        validator: function(){ return false; },
        message: {
            required: 'Por favor preencha o senha',
            length: 'O nome deve ter entre 6 e 12 caracteres',
            validator: 'Senha inválida'
        }
    },
    confirm_password: {
        type: String, required: true, length: { min:6, max:12 }, compare:'password',
        message: {
            required: 'Por favor preencha o sobre nome',
            length: 'O nome deve ter entre 2 e 30 caracteres',
            compare: 'A confirmacao da senha é invalida'
        }
    }
});

signup.prototype.save = function (fn)
{
    var callback = typeof fn === 'function' ? fn : function () {
    };

    if (!this.is_valid())
        return callback(this.validation_error_result());

    //FAZER A CHAMADA NA API
    var success_tmp = true;
    var result = this.create_result({result: success_tmp ? {} : null, fault: success_tmp ? null : {}});
    return callback(result);
};

module.exports = signup;