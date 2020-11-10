const EventEmitter = require( 'events'); 

const axon = require('pm2-axon');
const check = require('check-types');

const log =require( '../../logger');
const clone =require( 'clone');
//const ApiDevice=require('./api_device');

const xprs=require('express')();
const bodyParser = require('body-parser');

class apiController extends EventEmitter{

	constructor(config){
		super();

		this.config=config;
		this.tag='apiController';
		this._apiControllers={};

		//
		// LSS Event Emitter
		//

		const sockLss= axon.socket('sub-emitter');
		this.sockLss=sockLss;
		sockLss.connect(config.app.sockLss);

		//
		// Load all api plugins
		//
		
		this._pluginController = require('require-all')({
  		dirname     :  __dirname + '/plugins',
  		excludeDirs :  /^\.(git|svn)$/,
  		recursive   : true,
  		filter: /^(?!.*\.(spec|test)\.js$).*\.js$/,
  		recursive   : true,
  		map: function (name, path) {
  			let name_1=name.replace(/\.[^/.]+$/, "")
    		return name_1.replace(/_([a-z])/g, function (m, c) {
      		return c.toUpperCase();
    		});
    	}
		});

		this.command();
	}

	command(){

		//
		// Configure express to manage JSON iin the body request
		//

		xprs.use(bodyParser.urlencoded({extended: true}));
		xprs.use(bodyParser.json());

		for (let plugin in this._pluginController){	
			log.info(this.tag+' instantiating api plugin:'+this._pluginController[plugin].tag);
			this._apiControllers[plugin]=new this._pluginController[plugin](this.config,xprs);
		}

		xprs.listen(this.config.app.webServicePort);
	}
}

module.exports = apiController;