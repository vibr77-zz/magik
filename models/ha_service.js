var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var HAServiceSchema = new mongoose.Schema({   
  "service" : 				{type: String, unique: false, required: true, trim: true },
  "linked_item_type": {type: String, unique: false, required: true, trim: true },
  "linked_item_id":   {type: String, unique: false, required: false, trim: true },
  "status":         	Boolean,
},{strict:false});

var HAService = mongoose.model('HAService', HAServiceSchema,'HAService');
module.exports = HAService;