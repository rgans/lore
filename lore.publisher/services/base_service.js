var config = require_r('./app.config');
var fs = require('fs');
var path = require('path');
var request = require('request');
var extend = require('util')._extend;
var url = require("url");

function BaseService() {
    this._namespace = null;
    this._token = config.services.params.authtoken;
    this._namespaces = config.services.params.namespaces;
}

BaseService.prototype._setParams = function(params){
    config.services.params.authtoken = this._token = params.token;
    config.services.params.namespaces = this._namespaces = params.services;
};

BaseService.prototype._getAccessPoint = function(u){
    var self = this;
    var endpoints = new Array();
    self._namespaces.forEach(function(endpoint){ 
        if(endpoint.namespace === self._namespace)
            endpoint.accessPoints.forEach(function(accessPoint){
                endpoints.push(accessPoint + u);
            });
    });
    
    return endpoints;
};

BaseService.prototype._verifyToken = function (callback) {
    var self = this;
    
    if(self._token && self._namespaces) {
        console.log('Token already exist. Dont request a new one. ', self._token);
        callback.apply(self, [null, null]);
    } else {
        var url = config.services.params.host + config.services.security.authtoken;
        console.log('Token does not exist. Try to get on the service: ', url);
        self._mainrequest([url], { }, function(err, res, body){
            if(!err && res.statusCode === 200) {
                console.log('New token receved with success: ', body);
                self._setParams(JSON.parse(body));
            }

            callback.apply(self, [err, res]);
        });
    }
};

BaseService.prototype._request = function(url, options, callback) {
    var self = this;
    self._verifyToken(function(err, res) {
        if(err) {
            console.log('Error getting new token', err);
            callback(err);
        } else {
            var endpoints = self._getAccessPoint(url);
            console.log('Endpoints to request: ', endpoints);
            self._mainrequest(endpoints, options, function(err, res, body){
                callback(err, res, body);
            });
        }
    });
};

BaseService.prototype._mainrequest = function(urls, options, callback) {
    var self = this;
    if(urls.length > 0) {
        options.url = urls.shift();
        console.log('Request on: ', options.url);
        console.log('with options: ', options);
        request(options, function(err, res, body){
            if(err || res.statusCode === 408 || res.statusCode === 404 || res.statusCode === 503 || res.statusCode === 504) {
                console.log('Endpoint fail. Try next one ', err ? err : body);
                self._mainrequest(urls, options, callback);
            } else if(res.statusCode === 401) {
                console.log('Token expired. Try to get a new one.');
                config.services.params.authtoken = null;
                urls.unshift(options.url);
                self._verifyToken(function(err, res){
                    if(err)
                        callback.apply(self, [err, res, null]);
                    else
                        self._mainrequest(urls, options, callback);
                });
            } else {
                console.log('Request succesful');
                callback.apply(self, [err, res, body]);
            }
        });
    } else {
        callback.apply(self, [new Error({ message: 'No urls found to request' }), null, null]);
    }
};

BaseService.prototype._executemethod = function(method, url, options, callback) {
    if (typeof url !== 'string')
        throw new Error('undefined is not a valid uri or options object.');

    if (typeof options === 'function')
        callback = options;

    var params = {method:method};

    if (typeof options === 'object')
        options = extend(params, options);

    this._request(url, params, callback);
};

BaseService.prototype.get = function(url, options, callback) {
    console.log('GET request executing on ' + url);
    this._executemethod('GET', url, options, callback);
};

BaseService.prototype.post = function(url, options, callback) {
    console.log('POST request executing on ' + url);
    this._executemethod('POST', url, options, callback);
};

BaseService.prototype.put = function(url, options, callback) {
    console.log('PUT request executing on ' + url);
    this._executemethod('PUT', url, options, callback);
};

BaseService.prototype.patch = function(url, options, callback) {
    console.log('PATCH request executing on ' + url);
    this._executemethod('PATCH', url, options, callback);
};

BaseService.prototype.delete = function(url, options, callback) {
    console.log('DELETE request executing on ' + url);
    this._executemethod('DELETE', url, options, callback);
};

module.exports = BaseService;