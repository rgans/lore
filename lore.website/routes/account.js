var config = require('../app.config');
var util = require('../app.util');
var express = require('express');
var router = express.Router();

var AccountService = require(config.path.service.account);
var Signup = require(config.path.model.signup);

/* GET users listing. */
router.get('/signup', function(req, res, next) {
    var success = req.query.success;

    if(success || success === '')
        res.render('account/signup_success', { title: 'Signup' });
    else
        res.render('account/signup', { title: 'Signup', birth_dates: util.birth_dates });
});

router.post('/signup', function(req, res, next) {
    
    var model = new Signup(req.body);

    model.save(function(result)
    {
        result.birth_dates = util.birth_dates;
        
        if(result.fault)
            res.render('account/signup', result);
        else
            res.redirect('/signup?success');
    });
});

module.exports = router;
