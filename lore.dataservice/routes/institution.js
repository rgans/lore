var config = require('../config');
var ResultMessage = require('./resultmessage');
var express = require('express');
var router = express.Router();
var repository = require(config.path.repository.lore);
var Institution = repository.Institution;
var Campus = repository.Campus;

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var institution = repository.Institution;
    institution.find({}, function(err, institutions){
        
        if(err) console.log(err);
        else console.log(institutions);
        
        res.json(ResultMessage(institutions, err));
    });

});

router.get('/:id', function(req, res, next) {

    var id = req.params.id;

    var institution = repository.Institution;
    institution.findById(id, function(err, institutions){
        
        if(err) console.log(err);
        else console.log(institutions);
        
        res.json(ResultMessage(institutions, err));
    });

});

router.post('/', function(req, res, next) {

    var doc = req.body;

    Institution.create(doc, function(err, institution){
        
        if(err) console.log(err);
        
        res.json(ResultMessage(institution, err));
    });

});

router.post('/:id/campus', function(req, res, next) {

    var id = req.params.id;
    var docs = Array.isArray(req.body) ? req.body : new Array(req.body);
    
    docs.forEach(function(d){
        Campus.save(d, function(err){
            if(!err){
                Institution.findByIdAndUpdate(id, {'$push':{ campus:d._id }}, function(err, institution){

                    if(err) console.log(err);

                    res.json(ResultMessage(institution, err));
                });
            }
        });
    });

});

router.put('/:id', function(req, res, next) {

    var id = req.params.id;

    var newValue = {
        name: req.body.name
    };
    var institution = repository.Institution;

    institution.findByIdAndUpdate(id, newValue, function(err, institution){

        if(err) console.log(err);
        
        res.json(ResultMessage(institution, err));
    });

});

router.patch('/:id', function(req, res, next) {

    var id = req.params.id;

    var newValue = req.body;
    var institution = repository.Institution;

    institution.findOneAndUpdate(id, newValue, {new:true}, function(err, institution){

        if(err) console.log(err);

        res.json(ResultMessage(institution, err));
    });

});

router.delete('/:id', function(req, res, next) {

    var id = req.params.id;

    var institution = repository.Institution;

    institution.findByIdAndRemove(id, function(err){

        if(err) console.log(err);
        
        res.json(ResultMessage({}, err));
    });

});

module.exports = router;
