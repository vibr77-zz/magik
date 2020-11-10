var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var VdeviceStateEntrySchema = new Schema({
    state_id: {type: String, required: true},
    type : {type: String, required: true}
},{ strict: false });

module.exports = mongoose.model('VdeviceStateEntry', VdeviceStateEntrySchema,'VdeviceStateEntry' );

