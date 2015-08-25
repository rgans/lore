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

module.exports = {
    Institution: mongoose.model('institution')
};