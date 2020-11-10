var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var HACxSchema=new mongoose.Schema({   
  "cx" :              {type: String, unique: false, required: false, trim: true },
  "linked_item_type": {type: String, unique: false, required: false, trim: true },
  "linked_item_id":   {type: String, unique: false, required: false, trim: true },
  "value_min":        {type: Number, default:0},
  "value_max":        {type: Number, default:99},
  "value_units":      {type: String, unique: false, required: false, trim: true },
  "value_type":       {type: String, unique: false, required: false, trim: true }
},{strict:false});

var HAServiceSchema = new mongoose.Schema({   
  "service" : 				{type: String, unique: false, required: true, trim: true },
  "linked_item_type": {type: String, unique: false, required: true, trim: true },
  "linked_item_id":   {type: String, unique: false, required: false, trim: true },
  "status":         	Boolean,
  "value_min": 				{type: Number, default:0},
  "value_max": 				{type: Number, default:99},
  "value_units":      {type: String, unique: false, required: false, trim: true },
  "value_type":       {type: String, unique: false, required: false, trim: true },
  "cx": [HACxSchema]
},{strict:false});


var HAShellSchema = new mongoose.Schema({   
  "friendly_name" :    {type: String, unique: false, required: true, trim: true   },
  "description":       {type: String, unique: false, required: false, trim: true  },
  "manufacturer_name": {type: String, unique: false, required: false, trim: true  },
  "display_category":  [],
  "type" :  	         {type: String, unique: false, required: true, trim: true   },
  "linked_object_id":    {type: String, unique: false, required: true, trim: true },
  "linked_object_type":  {type: String, unique: false, required: true, trim: true },
  "status":         Boolean,
  "service": [HAServiceSchema],
},{strict:false});

var HAShell = mongoose.model('HAShell', HAShellSchema,'HAShell');
module.exports = HAShell;