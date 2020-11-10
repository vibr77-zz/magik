"use strict";

var mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = function (logger, dbUrl) {
  var conn = mongoose.createConnection(dbUrl, {
    useNewUrlParser: true
  });
  mongoose.connection.on('connected', function () {
    logger.info('Mongoose default connection open to ' + dbUrl);
  }); // If the connection throws an error

  mongoose.connection.on('error', function (err) {
    logger.error('Mongoose default connection error: ' + err);
  }); // When the connection is disconnected

  mongoose.connection.on('disconnected', function () {
    logger.warn('Mongoose default connection disconnected');
  }); // If the Node process ends, close the Mongoose connection 

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      logger.warn('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
  return conn;
};