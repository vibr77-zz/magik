var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var HeatingScheduleSchema = new mongoose.Schema({   
    'zone_id' : {type: String, unique: false, required: true, trim: true },
    'dow' :  {	type : Number, min:0, max: 7,	default: 0},
    'hour' : { 	type : Number, min:0,	max:24,	default: 0}, 
    'min' :  { 	type : Number, min:0,	max:59,	default: 0},
    'status':{	type : Number, min:0,	max:10,	default: 0},
    'creation_date':{ type : Date, default: Date.now }
});

var HeatingSchedule = mongoose.model('HeatingSchedule', HeatingScheduleSchema,'HeatingSchedule');
module.exports = HeatingSchedule;