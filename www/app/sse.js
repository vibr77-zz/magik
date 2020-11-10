import config from './config';


import { withStyles } from "@material-ui/core/styles";

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';


const mapStateToProps = function(state) {
  return {
    devices:state.device.devices,
  }
}

const mapDispatchToProps = dispatch => ({
 
});


class Sse extends React.Component {

  constructor(props){
  	super();
  	let eventSource = new EventSource(config.wsUri+"sse");

    eventSource.onmessage = function(event){
    	console.log(event);
    	console.log(JSON.parse(event.data));
    }

  }
  render(){
  	return "";
  }
}

export default compose( connect(mapStateToProps,mapDispatchToProps))(Sse);