var config = require_r('/config');
var Fault = require('./fault');
var extend = require('util')._extend;
var url = require("url");

var queryparser = function(criteria) {
    if(criteria === null || typeof criteria !== 'object')
        throw new Error('Criteria is required!');

    this._criteria = {
        identifier: null,
        expand: null,
        filter: null,
        select: null
    };

    this._criteria = extend(this._criteria, criteria);
};

queryparser.prototype.parse = function(u) {
    if(u === null || typeof u !== 'string')
        throw new Error('Url is required!');

    var c = this._criteria;
    var pu = url.parse(u);

    if(c.identifier && typeof c.identifier === 'string')
        pu.pathname += '/'+ c.identifier;
    
    pu.query = {};

    if(c.expand && Array.isArray(c.expand))
        pu.query.$expand = c.expand.join(',');

    return url.format(pu);
};

module.exports = queryparser;