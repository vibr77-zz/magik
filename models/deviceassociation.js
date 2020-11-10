var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var DeviceAssociationSchema = new mongoose.Schema({   
    "home_id" : {type: String, unique: false, required: true, trim: true },
    "node_id" : {type: String, unique: false, required: true, trim: true },
    "group_id" :{type: String, unique: false, required: true, trim: true },
    "target_node_id" : {type: String, unique: false, required: true, trim: true },
    "creation_date" : {type: String, unique: false, required: false, trim: true } 
 });


var DeviceAssociation = mongoose.model('DeviceAssociation', DeviceAssociationSchema,'DeviceAssociation');
module.exports = DeviceAssociation;