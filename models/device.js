var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var DeviceSchema = new mongoose.Schema({
  device_id: 		{type: String, unique: true, required: true, trim: true },
  visible: 			{type: Boolean, required: false, default: true },
  image: 				{type: String,required: false},
  description: 	{type: String,required: false},
  alexa_friendly_name:{type: String,required: false},
  alexa_activity:{type: String,required: false}
});

var Device = mongoose.model('Device', DeviceSchema,'Device');
module.exports = Device;