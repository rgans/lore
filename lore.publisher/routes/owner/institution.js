var express = require('express');
var router = express.Router();
var InstitutionService = require_r('/services/institutionservice');

var service = new InstitutionService();

var get_wizard = function(req, res, next) {
    res.render('owner/institution/institution_wizard');
};

var post_wizard = function(req, res, next) {
    
    var model = { name: req.body.name };

    

    res.render('owner/institution/institution_wizard');
};

var get_id_wizard = function(req, res, next) {

    var model = {};

    service.findById(req.params.id, 
    function(result){
        //Erros on data validation
        if(result.fault) {
            model.fault = result.fault;
            //res.render('owner/physical/building_wizard', model);
        }
        //Sucess on the request
        else {
            model = result.data ? result.data : null;
            //res.render('owner/physical/building_wizard', model);
        }
        res.json(result);
    }, 
    //Not expected erros
    function(error){
        model.error = 'Ocorreu um erro inesperado';
        //res.render('owner/physical/building_wizard', model);
        res.json(error);
    });
};

var post_id_wizard = function(req, res, next) {
    
    var model = {
        name: req.body.name,
        campus: [req.body.campus]
    };

    service.save(req.params.id, model, 
    function(result){
        //Erros on data validation
        if(result.fault) {
            model.fault = result.fault;
            //res.render('owner/institution/building_wizard');
        }
        //Sucess on the request
        else {
            model = result.data ? result.data : null;
            //res.render('owner/institution/building_wizard');
        }
        res.json(result);
    }, 
    //Not expected erros
    function(error){
        model.error = 'Ocorreu um erro inesperado';
        //res.render('owner/institution/building_wizard');
        res.json(error);
    });
};

router.get('/wizard', get_wizard);
router.post('/wizard', post_wizard);
router.get('/:id/wizard', get_id_wizard);
router.post('/:id/wizard', post_id_wizard);

module.exports = router;
