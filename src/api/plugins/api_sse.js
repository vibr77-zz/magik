const Ajv=require('ajv');
const check = require('check-types');
const axon = require('pm2-axon');

const log =require( '../../../logger');
const clone =require( 'clone');

const {DeviceEventTypes,Domain} = require( '../../cst');
const tools = require( '../../lib/tools');

const TAG='apiSse';

class apiSse{
	static tag=TAG;
	constructor(config,xprs) {
		this.tag=TAG;
		this.xprs=xprs;
		this.config=config;
		this.clients=[]; // List of subscribed client to SSE

		const sockDeviceEvent= axon.socket('sub-emitter');
		sockDeviceEvent.connect(config.app.sockDeviceEvent);
		this.sockDeviceEvent=sockDeviceEvent;

		this.command();
		this.eventMonitor();
	}

	command(){

		//getspell
		this.xprs.get('/api/sse', function(req, res){
			
			const headers = {
    		'Content-Type': 'text/event-stream',
    		'Connection': 'keep-alive',
    		'Cache-Control': 'no-cache'
  		};
  		res.writeHead(200, headers);

  		const clientId = Date.now();
  		const newClient = {
    		id: clientId,
    		res
  		};
  		
  		// const intervalId = setInterval(() => {
  		// 	let messageId=tools.mongoObjectId()
    //     res.write(`id: ${messageId}\n`);
    //     res.write(`data: Test Message -- ${Date.now()}\n\n`);
        
   	// 		 }, 1000);

  		res.write('\n');
  		this.clients.push(newClient);
  		
  		// When client closes connection we update the clients list
  		// avoiding the disconnected one
  		console.log("client connected");
  		req.on('close', () => {
    		log.info(TAG+" client close SSE connection _id:"+clientId)
    		this.clients = this.clients.filter(c => c.id !== clientId);
 	 		});

		}.bind(this));
	}

	eventMonitor(){

		this.sockDeviceEvent.on(DeviceEventTypes.CHARACTERISTIC_CHANGE,function(msg){
			//console.log(msg);
			this.clients.forEach(
				function(c){
					console.log("event sse client "+c.id);
					let messageId=tools.mongoObjectId()
	    		c.res.write(`id: ${messageId}\n`);
	    		c.res.write(`data: ${JSON.stringify(msg)}\n\n`);
				})
		
		}.bind(this));
	}
}
module.exports = apiSse;