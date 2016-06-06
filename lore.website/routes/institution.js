var config = require('../app.config');
var util = require('../app.util');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('institution/apply');
});

router.get('/apply', function(req, res, next) {
    var result = { isq: req.query.isq, result:[{id: '1', name: 'Instituto 1', owner: 'Dono 1'}, {id: '2', name: 'Instituto 2', owner: 'Dono 2'}, {id: '3', name: 'Instituto 3', owner: 'Dono 3'}] };
    res.render('institution/apply', result);
});

router.post('/apply', function(req, res, next) {
    var result = { isq: req.query.isq, result:[{id: '1', name: 'Instituto 1', owner: 'Dono 1'}, {id: '2', name: 'Instituto 2', owner: 'Dono 2'}, {id: '3', name: 'Instituto 3', owner: 'Dono 3'}] };
    res.render('institution/apply', result);
});

module.exports = router;
