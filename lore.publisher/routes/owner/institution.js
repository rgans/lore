var c = require('../../config');
var institutionService = require(c.path.service.institution);
var express = require('express');
var validator = require('express-form').configure({ autoTrim: true });
var field = validator.field;
var router = express.Router();

/* GET home page. */
router.get('/wizard', function(req, res, next) {
    res.render(c.path.views.owner.institution_wizard);
});

router.post('/wizard', 
validator(
    field('name', 'Nome da instituicao').required('O campo %s e obrigatorio').isAlpha('Nome invalido')
)
,function (req, res, next) {

    if(!req.form.isValid) {
        console.log(req.form.getErrors());
        res.render(c.path.views.owner.institution_wizard, { fault: req.form.getErrors() });
    } else {
        institutionService.post(req.body, function(r){
            console.log(r);
            if(r.fault) {
                res.render(c.path.views.owner.institution_wizard, r);
            } else {
                res.redirect('/owner/institution/' + r.result._id + '/wizard');
            }
        });
    }
});

router.get('/:id/wizard', function(req, res, next) {
    
    var id = req.params.id;
    institutionService.getById(id, function(r){
        res.render(c.path.views.owner.building_wizard, r);
    });
});

module.exports = router;
