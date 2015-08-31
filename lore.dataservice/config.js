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
                institution: path.join(__dirname, 'database/lore/institution_entity'),
                address: path.join(__dirname, 'database/lore/address_entity'),
                archive: path.join(__dirname, 'database/lore/archive_entity'),
                building: path.join(__dirname, 'database/lore/building_entity'),
                campus: path.join(__dirname, 'database/lore/campus_entity'),
                contact: path.join(__dirname, 'database/lore/contact_entity'),
                permission: path.join(__dirname, 'database/lore/permission_entity'),
                person: path.join(__dirname, 'database/lore/person_entity'),
                role: path.join(__dirname, 'database/lore/role_entity'),
                user: path.join(__dirname, 'database/lore/user_entity'),
                student: path.join(__dirname, 'database/lore/student_entity'),
                room: path.join(__dirname, 'database/lore/room_entity'),
                parent: path.join(__dirname, 'database/lore/parent_entity'),
                grade: path.join(__dirname, 'database/lore/grade_entity'),
                form: path.join(__dirname, 'database/lore/form_entity'),
                employee: path.join(__dirname, 'database/lore/employee_entity'),
                discipline: path.join(__dirname, 'database/lore/discipline_entity')
            }
        },
        
        routes: {
            index: path.join(__dirname, 'routes/index'),
            logger: path.join(__dirname, 'routes/logger')
        }
    }
    
};

module.exports = config;