
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    props:{
      lastName: {
      	type: String,
      	required: true
      },
      firstName:{
      	type: String,
      	required: true,
        defalut:''
     	},
      msisdn_perso: {
      	type: String,
      	required: false,
      	default: ''
      },
      msisdn_pro: {
        type: String,
        required: false,
        default: ''
      },
      parallelProcess:{
    		type: Boolean,
    		required: false,
    		default:false
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
    email: {
      type: String,
      required: true,
      default: ''
    },
  	password:{
  		type: String,
      required: true,
      default: ''
    },
  }
);

module.exports = (connection) => {
	return connection.model('User', UserSchema);
};

