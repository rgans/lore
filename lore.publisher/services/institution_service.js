/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var request = require('request');
var ResultMessage = require('./result_message');

var service = {
    baseUrl: 'http://localhost:3000/institution',
};

service.get = function(filter, callback)
{
    if(typeof filter === 'function') callback = filter, filter = {};
    if(filter === null) filter = {};
    if(typeof callback !== 'function') callback = null;

    request(service.baseUrl, function (err, res, body) {
        if(callback) callback(ResultMessage(err, res, body));
    });
};

service.getById = function(id, callback)
{
    if(typeof callback !== 'function') callback = null;
    if(typeof id !== 'string') {
        if(callback) callback(ResultMessage(new Error('Id must be a uid')));
        else return;
    }

    request(service.baseUrl + '/' + id, function (err, res, body) {
        if(callback) callback(ResultMessage(err, res, body));
    });
};

service.post = function(data, callback)
{
    if(typeof data === 'function') callback = data, data = {};
    if(data === null) data = {};
    if(typeof callback !== 'function') callback = null;

    request.post({url:service.baseUrl, form: data}, function(err, res, body){
        if(callback) callback(ResultMessage(err, res, body));
    });
};

module.exports = service;