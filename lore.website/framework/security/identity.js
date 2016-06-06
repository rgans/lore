var identity = function(data){
    if(data) {
        this.name = data.name;
        this.email = data.email;
        this.identifier = data.id;
        this.isAuthenticated = (this.identifier !== null && this.identifier !== '' && this.identifier !== 'undefined');
    }
};

module.exports = identity;