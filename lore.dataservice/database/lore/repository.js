var config = require('../../config');
var mongoose = require("mongoose");

// Create the database connection 
mongoose.connect(config.repository.lore.cnnString, config.repository.lore.options);

// CONNECTION EVENTS 
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.repository.lore.cnnString);
});

mongoose.connection.on('error', function (err) {
    console.error.bind(console, 'MongoDB connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

var institutionSchema = require(config.path.entity.lore.institution);
//var addressSchema = require(config.path.entity.lore.address);
//var archiveSchema = require(config.path.entity.lore.archive);
//var buildingSchema = require(config.path.entity.lore.building);
var campusSchema = require(config.path.entity.lore.campus);
//var contactSchema = require(config.path.entity.lore.contact);
//var permissionSchema = require(config.path.entity.lore.permission);
//var personSchema = require(config.path.entity.lore.person);
//var roleSchema = require(config.path.entity.lore.role);
//var userSchema = require(config.path.entity.lore.user);
//var studentSchema = require(config.path.entity.lore.student);
//var roomSchema = require(config.path.entity.lore.room);
//var parentSchema = require(config.path.entity.lore.parent);
//var gradeSchema = require(config.path.entity.lore.grade);
//var formSchema = require(config.path.entity.lore.form);
//var employeeSchema = require(config.path.entity.lore.employee);
//var disciplineSchema = require(config.path.entity.lore.discipline);

module.exports = {
    Institution: mongoose.model(institutionSchema.modelName),
//    Address: mongoose.model(addressSchema.collection_name),
//    Archive: mongoose.model(archiveSchema.collection_name),
//    Building: mongoose.model(buildingSchema.collection_name),
    Campus: mongoose.model(campusSchema.modelName),
//    Contact: mongoose.model(contactSchema.collection_name),
//    Permission: mongoose.model(permissionSchema.collection_name),
//    Person: mongoose.model(personSchema.collection_name),
//    Role: mongoose.model(roleSchema.collection_name),
//    User: mongoose.model(userSchema.collection_name),
//    Student: mongoose.model(studentSchema.collection_name),
//    Room: mongoose.model(roomSchema.collection_name),
//    Parent: mongoose.model(parentSchema.collection_name),
//    Grade: mongoose.model(gradeSchema.collection_name),
//    Form: mongoose.model(formSchema.collection_name),
//    Employee: mongoose.model(employeeSchema.collection_name),
//    Discipline: mongoose.model(disciplineSchema.collection_name)
    
};