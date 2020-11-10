var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString,  { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true }/*{useMongoClient: true}*/);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var SpellSchema = new Schema({
    scene_id: {type: String, required: false},
    title : {type: String, required: true},
    status:  {type: String, required: false,default:'0'},
    menuitem:  {type: String, required: false},
    spellcategory_id:  {type: String, required: false},
    description:  {type: String, required: false},
    alexa_friendly_name:{type: String, required: false},
    alexa_activity:  {type: String, required: false,default:'0'},
  	parallelprocess:{type: String, required: false,default:'0'}
  }
);

module.exports = mongoose.model('Spell', SpellSchema,'Spell' );

