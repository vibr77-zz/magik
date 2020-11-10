var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var VdeviceSchema = new mongoose.Schema({   
    'title' : {type: String, unique: false, required: true, trim: true },
    "sorder" :  {type: Number, min: 0,default: 0 },
    "vdevice_id" : {type: String, unique: false, required: false, trim: true },
    "visible" :   { type : Number, min:0,max:100,default: 0},
    "widget_type" : {type: String, unique: false, required: false, trim: true },
    "nodeimage" : {type: String, unique: false, required: false, trim: true },
    "room_id" : {type: String, unique: false, required: true, trim: true }
},{strict:false});

var Vdevice = mongoose.model('Vdevice', VdeviceSchema,'Vdevice');
module.exports = Vdevice;