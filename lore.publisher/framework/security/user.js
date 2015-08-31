var Identity = require('./identity');

var user = function(data) {
    this.identity = new Identity(data);
    this.institution = null;
};

user.prototype.isInRole = function(role) {
    return true;
};

module.exports = user;