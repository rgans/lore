var config = require('../config');
var ResultMessage = require('./result_message');
var express = require('express');
var router = express.Router();
var repository = require(config.path.repository.lore);

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var institution = repository.Institution;
    institution.find({}, function(err, institutions){
        
        if(err) console.log(err);
        else console.log(institutions);
        
        res.send(ResultMessage(institutions, err));
    });

});

router.get('/:id', function(req, res, next) {

    var id = req.param.id;

    var institution = repository.Institution;
    institution.findById(id, function(err, institutions){
        
        if(err) console.log(err);
        else console.log(institutions);
        
        res.send(ResultMessage(institutions, err));
    });

});

router.post('/', function(req, res, next) {

    console.log('BODY: ' + req.body);

    var institution = repository.Institution({
        name: req.body.name
    });

    institution.save(function(err){
        
        if(err) console.log(err);
        
        res.send(ResultMessage(institution, err));
    });

});

router.put('/:id', function(req, res, next) {

    var id = req.param.id;

    console.log('BODY: ' + req.body);

    var newValue = {
        name: req.body.name
    };
    var institution = repository.Institution;

    institution.findByIdAndUpdate(id, newValue, function(err, institution){

        if(err) console.log(err);
        
        res.send(ResultMessage(institution, err));
    });

});

router.patch('/:id', function(req, res, next) {

    var id = req.param.id;

    console.log('BODY: ' + req.body);

    var newValue = req.body;
    var institution = repository.Institution;

    institution.findByIdAndUpdate(id, newValue, function(err, institution){
        
        if(err) console.log(err);
        
        res.send(ResultMessage(institution, err));
    });

});

router.delete('/:id', function(req, res, next) {

    var id = req.param.id;

    var institution = repository.Institution;

    institution.findByIdAndRemove(id, function(err){

        if(err) console.log(err);
        
        res.send(ResultMessage({}, err));
    });

});

module.exports = router;
