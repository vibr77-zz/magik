var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var AlarmEntrySchema = new Schema({
    event_type: {type: String, required: true},
    parent_key:  {type: String, required: true},
    type : {type: String, required: true},
},{ strict: false });

//Export function to create "SomeModel" model class
module.exports = mongoose.model('AlarmEntry', AlarmEntrySchema,'AlarmEntry' );