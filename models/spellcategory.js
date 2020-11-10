var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString,  { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true }/*{useMongoClient: true}*/);
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var SpellCategorySchema = new Schema({
    //spellcategory_id : {type: String,unique: false, required: false, trim: true}, 
    title : {type: String, unique: true, required: true, trim: true},
    sorder:{type:Number,min:0,unique:false,required:true}
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('SpellCategory', SpellCategorySchema,'SpellCategory' );

