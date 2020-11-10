var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var DeviceLastEventSchema = new mongoose.Schema({   
    "command_class" : 	{type: String, unique: false, required: true, trim: true },
    "device_id" :  			{type: Number, min: 1, max: 255 },
    "indx" : 						{type: Number, min: 0, max: 99 }, 
    "instance" : 				{type: Number, min: 0, max: 20 }, 
    "key" : 						{type: String, unique: true, required: true, trim: true }, 
    "value" : 					{type: String, unique: false, required: true, trim: true },
    "value_ts" : 				{type : Date, default: Date.now }
 },{strict:false});

var DeviceLastEvent = mongoose.model('DeviceLastEvent', DeviceLastEventSchema,'DeviceLastEvent');
module.exports = DeviceLastEvent;