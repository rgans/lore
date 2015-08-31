var config = require('../config');
var authorize = require(config.path.framework.security.authorize);
var User = require(config.path.framework.security.user);
var DataAccessService = require(config.path.services.dataaccess);
var express = require('express');
var router = express.Router();

router.path = '/account';

var service = new DataAccessService();

/* GET users listing. */
router.get('/', authorize, function(req, res, next) {
    model = {};
    
    service.user({
        identifier: req.user.identity.identifier, 
        expand:['person']
    }, 
    function(result){
        //Erros on data validation
        if(result.faults) {
            model.faults = result.faults;
            res.render(config.path.views.account.profile, model);
        }
        //Sucess on the request
        else {
            model = result.data && result.data.length > 0 ? result.data[0] : null;
            res.render(config.path.views.account.profile, model);
        }
    }, 
    //Not expected erros
    function(error){
        model.error = 'Ocorreu um erro inesperado';
        res.render(config.path.views.account.profile, model);
    });
});

router.post('/', authorize, function(req, res, next) {
    console.log(req.body);
    model = {
        id: req.user.identity.identifier,
        email: req.body.email,
        person:[{
            id: req.body['person[0].id'],
            name: req.body.person_name,
            email: req.body.person_email,
            identityCard: req.body.person_identityCard,
            birthDay: req.body.person_birthDay,
            gender: req.body.person_gender,
            photo: req.body.person_photo,
            homePhone: req.body.person_homePhone,
            workPhone: req.body.person_workPhone,
            cellPhone: req.body.person_cellPhone
        }]
    };
    return;
    service.saveuser(model, 
    function(result){
        console.log(result);
        //Erros on data validation
        if(result.faults) {
            model.faults = result.faults;
            res.render(config.path.views.account.profile, model);
        }
        //Sucess on the request
        else {
            res.redirect('/account');
        }
    }, 
    //Not expected erros
    function(error){
        model.error = 'Ocorreu um erro inesperado';
        res.render(config.path.views.account.profile, model);
    });
});

router.get('/login', function(req, res, next) {
  res.render(config.path.views.account.login, {});
});

router.post('/login', function(req, res, next) {

    model = {
        username: req.body.username,
        password: req.body.password,
        corporation: 1,
        returnUrl: req.query.curl
    };

    service.authenticate(model, 
    function(result){
        //Erros on data validation
        if(result.faults) {
            model.faults = result.faults;
            res.render(config.path.views.account.login, model);
        }
        //Sucess on the request
        else {
            req.session.regenerate(function(){
                // Store the user's primary key
                // in the session store to be retrieved,
                // or in this case the entire user object
                req.session.user = new User(result.data.user);
                req.user = req.session.user;

                if(model.returnUrl) res.redirect(model.returnUrl);
                else res.redirect('/');
             });
        }
    }, 
    //Not expected erros
    function(error){
        model.error = 'Ocorreu um erro inesperado';
        res.render(config.path.views.account.login, model);
    });
});

router.get('/logout', function(req, res, next) {
    req.session.destroy(function(){
        res.redirect('/account/login');
    });
});

module.exports = router;
