var config = require('../app.config');
var express = require('express');
var router = express.Router();

var AccountService = require(config.path.service.account);
var Signup = require(config.path.model.signup);

/* GET users listing. */
router.get('/', function(req, res, next) {
    var success = req.query.success;

    if(success || success === '')
        res.render('signup_success', { title: 'Signup' });
    else
        res.render('signup', { title: 'Signup' });
});

router.post('/', function(req, res, next) {
    
    var model = new Signup(req.body);

    model.save(function(result)
    {
        if(result.fault)
            res.render('signup', result);
        else
            res.redirect('/signup?success');
    });
});

module.exports = router;
