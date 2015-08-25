var path = require('path');

var config = {
    
    repository: {
        communication: {
            options: { replset: { socketOptions: { connectTimeoutMS : 50 }}},
            address: 'localhost',
            name: 'lalubema-services-communication',
            cnnString: 'mongodb://localhost/lalubema-services-communication'
        }
    },
    
    path: {
        service: {
            institution: path.join(__dirname, 'services/institution_service')
        },
        
        entity: {
            communication: {
                notification: path.join(__dirname, 'database/communication/notification_entity')
            }
        },
        
        routes: {
            account: path.join(__dirname, 'routes/institution'),
            owner: {
                institution: '/owner/institution',
                building_add: function(id) { '/owner/institution/' + id + 'building/wizard' }
            }
        },
        
        views: {
            owner: {
                institution_wizard: path.join(__dirname, 'views/owner/physical/institution_wizard'),
                building_wizard: path.join(__dirname, 'views/owner/physical/building_wizard')
            },
        }
    }
    
};

module.exports = config;