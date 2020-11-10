
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpellSchema = new Schema({
    props:{
      displayName: {
      	type: String,
      	required: true
      },
      description:{
      	type: String,
      	required: false,
        defalut:''
     	},
      status: {
      	type: Boolean,
      	required: true,
      	default: false
      },
      isHidden: {
      	type: Boolean,
      	required: false,
      	default: true
      },
      parallelProcess:{
    		type: Boolean,
    		required: false,
    		default:false
    	},
      categoryId:{
      	type: String,
      	required: false,
        default:null
      },
      storeExecLog:{
        type:Boolean,
        required:true,
        default:false
      },
      maxExecutionLog:{
        type:Number,
        required:true,
        default:16
      },
      creationDate:{
        type: Date,
        default: Date.now()
      },
      modificationDate:{
        type: Date,
        default: Date.now()
      }
    },
    spellEntries:{
    	type:Array,
    	required:true,
    	default:[]
    },
  	executionLog:{
  		type: Array,
  		default:[]
  	}
  }
);

module.exports = (connection) => {
	return connection.model('Spell', SpellSchema);
};

