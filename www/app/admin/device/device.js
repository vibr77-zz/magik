
import { withStyles } from "@material-ui/core/styles";

// Material UI Core & component
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';


// React - Redux
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Material UI Icon
import MenuIcon from '@material-ui/icons/Menu';

// Redux actions
import { snackbarActions } from '../../_actions';
import { deviceActions } from '../../_actions';


import DeviceTreeView from './device.treeview'
import DeviceCxForm from './device.cxform'
import DeviceCxTable from './device.cxtable'


const mapStateToProps = function(state) {
  return {
    devices: state.device.devices,
    plugins: state.device.plugins,
    selectedDeviceItem: state.device.activeItem
  }
}

const mapDispatchToProps = dispatch => ({
  getPlugins: () => dispatch(deviceActions.getPlugins()),
  setActiveDeviceElement:(Element)=>dispatch(deviceActions.setActiveItem(Element)),
});


const useStyles = theme =>({
  root: {
    flexGrow: 1,
    opacity:1,
    height:"100%",
    
  },
  navBar:{
    backgroundColor: "#444444",
    minHeight: 36,
  },
  title: {
    flexGrow: 1,
    fontWeight: 'small',
    color:"#FFFFFF"
  },
  
  content: {
    flexGrow:1,
    display: "inline",
    alignContent:'flex-start'
  }
});

class Device extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    };

    this.props.getPlugins();
  }

  getCxContent(items){
    return items.map(item => {
      return ( <DeviceCxForm cx={item} /> );
    });
  }


  render(){
    const classes = this.props.classes;
    let formContent='';
    if (this.props.selectedDeviceItem && this.props.selectedDeviceItem.type==="deviceService"){
      formContent=this.getCxContent(this.props.selectedDeviceItem.characteristics);
    }
    let srv=this.props.selectedDeviceItem;

    return(
      <Grid className={classes.root} container spacing={1}>
       
        <Grid item xs={2}>
          <Paper className={classes.root} spacing={1}>
            <DeviceTreeView/>
          </Paper>
        </Grid>

        <Grid className={classes.root} item xs={10} >
          <AppBar className={classes.navBar} position="static" color="default">
            <Toolbar variant="dense" className={classes.title}>
              <IconButton aria-controls="DeviceMenu" aria-haspopup="true"  edge={false} onClick={this.handleMenuItemClick} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{ overflowY: 'auto',height:"100%", zIndex: 2, margin: 0, padding: 0 }}>
            {srv?<DeviceCxTable service={srv} />:''}
             {formContent}
            }
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default compose(withStyles(useStyles), connect(mapStateToProps,mapDispatchToProps))(Device);