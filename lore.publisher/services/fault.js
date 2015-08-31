var fault = function(code, message, innerException) {
    this.code = typeof code === 'number' ? code : null;
    this.message = typeof code === 'string' ? code : message;
    this.innerException = innerException;
};

module.exports = fault;