var path = require('path');

var config = {
    
    repository: {
        lore: {
            options: { replset: { socketOptions: { connectTimeoutMS : 50 }}},
            address: 'localhost',
            name: 'lore',
            cnnString: 'mongodb://localhost/lore'
        }
    },
    
    path: {
        repository: {
            lore: path.join(__dirname, 'database/lore/repository')
        },
        
        entity: {
            lore: {
                institution: path.join(__dirname, 'database/lore/institution_entity')
            }
        },
        
        routes: {
            index: path.join(__dirname, 'routes/index'),
            logger: path.join(__dirname, 'routes/logger')
        }
    }
    
};

module.exports = config;