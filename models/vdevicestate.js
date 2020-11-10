var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var VdeviceStateSchema = new mongoose.Schema({   
    "state_title" : {type: String, unique: false, required: true, trim: true },
    "sorder" :  {type: Number, min: 0,default: 0 },
    "vdevice_id" : {type: String, unique: false, required: false, trim: true },
    "index" :   { type : Number, min:0,max:100,default: 0},
    "state_id" : {type: String, unique: false, required: false, trim: true }
});

var VdeviceState = mongoose.model('VdeviceState', VdeviceStateSchema,'VdeviceState');
module.exports = VdeviceState;