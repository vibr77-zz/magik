var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var HeatingZoneSchema = new mongoose.Schema({   
    "title" : {type: String, unique: false, required: true, trim: true },
    "mode" :  {type: Number, min: 0, max: 10,default: 0 },
    "status" : { type : Number, min:0,max:10,default: 0}, 
    "vdevice" : [{type: String, required:false, trim:true }]   
},{strict:false});

var HeatingZone = mongoose.model('HeatingZone', HeatingZoneSchema,'HeatingZone');
module.exports = HeatingZone;