const Ajv=require('ajv');
const check = require('check-types');

const log =require( '../../../logger');

const clone =require( 'clone');
const axon = require('pm2-axon');

const TAG='apiDevice';

class apiDevice{
	static tag=TAG;

	constructor(config,xprs) {
		
		this.tag=TAG
		this.xprs=xprs;
		this.config=config;
		
		const sockDeviceCommand=axon.socket('req');
		sockDeviceCommand.connect(this.config.app.sockDeviceCommand);
		this.sockCommand=sockDeviceCommand;
		
		this.command();
	}

	command(){


		this.xprs.get('/api/devicePlugin', function(req, res){
			
			let cmd={method:'getDevicePlugins'};
			
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(400).send({
      			success: 'false',
      			message: err,
    			});
				}
			});
		}.bind(this));

		this.xprs.get('/api/device', function(req, res){
			
			let cmd={method:'getDevices'};
			
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(400).send({
      			success: 'false',
      			message: err,
    			});
				}
			});
		}.bind(this));

		this.xprs.get('/api/device/:id', function(req, res){
			let id=req.params.id;
			let cmd={method:'getDevice',_id:id};
			
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{

					return res.status(err.statusCode).send({
      			success: 'false',
      			message: err.message,
    			});
				}
			});
		}.bind(this));

		this.xprs.get('/api/device/:deviceId/services', function(req, res){
			let deviceId=req.params.deviceId;
			let cmd={method:'getDevice',_id:deviceId};
	
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result.services);
				else{
					return res.status(400).send({
      			success: 'false',
      			message: err,
    			});
				}
			});
		}.bind(this));

		this.xprs.put('/api/device/:deviceId', function(req, res){ // tested
			let deviceId=req.params.deviceId;

			let cmd={method:'setDeviceProps',_id:deviceId,props:req.body.props};
			
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(400).send({
      			success: 'false',
      			message: err,
    			});
				}
			});
		}.bind(this));

		this.xprs.put('/api/device/:deviceId/service/:serviceId', function(req, res){ // to be tested & finished
			
			let deviceId=req.params.deviceId;
			let serviceId=req.params.serviceId;

			let cmd={method:'setDeviceServiceProps',deviceId:deviceId,serviceId:serviceId,props:req.body.props};
			
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(400).send({
      			success: 'false',
      			message: err,
    			});
				}
			});
		}.bind(this));

		this.xprs.put('/api/device/:deviceId/service/:serviceId/cx/:cxName/value/:value', function(req, res){
			
			let deviceId=req.params.deviceId;
			let serviceId=req.params.serviceId;
			let cxName=req.params.cxName;
			let value=req.params.value

			let cmd={method:'setCxValue',deviceId:deviceId,serviceId:serviceId,cxName:cxName,value:value};

			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(400).send({
      			success: 'false',
      			message: err,
    			});
				}
			});
		}.bind(this));
	}
}

module.exports = apiDevice;
