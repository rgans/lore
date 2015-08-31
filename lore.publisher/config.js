var path = require('path');

var config = {};

config.services = {
    params: { 
        host:'http://localhost:3000', 
        authtoken:'algum', 
        namespaces:[{ namespace: 'br-com-lore-services-dataaccess', accessPoints: ['http://localhost:3000'] }]
    }
};

config.services.dataaccess = {
    namespace: 'br-com-lore-services-dataaccess',
    authenticate: '/security/authenticate',
    institution: '/institution',
    user: '/user'
};

config.repository = {
        communication: {
            options: { replset: { socketOptions: { connectTimeoutMS : 50 }}},
            address: 'localhost',
            name: 'lalubema-services-communication',
            cnnString: 'mongodb://localhost/lalubema-services-communication'
        }
    };

module.exports = config;