var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var SpellEntrySchema = new Schema({
    scene_id: {type: String, required: true},
    scene_item_id : {type: String, required: false},
    parent_key:  {type: String, required: true},
    type : {type: String, required: true},
    /*target_spell_id:{type: String, required: false}*/
},{ strict: false });

//Export function to create "SomeModel" model class
module.exports = mongoose.model('SpellEntry', SpellEntrySchema,'SpellEntry' );

