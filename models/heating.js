var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var HeatingSchema = new mongoose.Schema({   
    "heating" : {type: Number, min: 1, max: 10,default: 0 },
    "mode" :  	{type: Number, min: 0, max: 10,default: 0 }
});

var Heating = mongoose.model('Heating', HeatingSchema,'Heating');
module.exports = Heating;