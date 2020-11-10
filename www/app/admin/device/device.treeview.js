import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const check = require('check-types');
const clone=require('clone');

import { Link } from 'react-router-dom';

import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Box from '@material-ui/core/Box';




// Material UI Declaration
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from '@material-ui/icons/Refresh';

// Material Ui Icon
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExtensionSharpIcon from '@material-ui/icons/ExtensionSharp';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import HealingIcon from '@material-ui/icons/Healing';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AllInclusiveOutlinedIcon from '@material-ui/icons/AllInclusiveOutlined';
import FolderIcon from '@material-ui/icons/Folder';


import { snackbarActions } from '../../_actions';
import { deviceActions } from '../../_actions';

const mapStateToProps = function(state) {
  return {
    plugins: state.device.plugins,
    selectedDeviceItem: state.device.activeItem
  }
}

const mapDispatchToProps = dispatch => ({
  getPlugins: () => dispatch(deviceActions.getPlugins()),
  setActiveDeviceElement:(Element)=>dispatch(deviceActions.setActiveItem(Element))
});

const useStyles = theme =>({
  root: {
    flexGrow: 1,
    
  },
  navBar:{
    backgroundColor: "#444444",
    minHeight: 36,
  },
  root2: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,

  },
  selected: {
    '&:focus': {
      backgroundColor: '#CCCCCC',
    },
  },
  menuButton: {
    
  },
  ListItemIcon:{
    width:"10px",
    marginRight:"-25px"
  },
  title: {
    flexGrow: 1,
    fontWeight: 'small',
    marginLeft:"5px",
  },
  treeItem:{
    fontSize:'0.95em'
  },
  content: {
    flexGrow:1,
    display: "inline",
    alignContent:'flex-start'
  },
});

class DeviceTreeView extends React.Component {

  constructor(props){
    super(props);

    this.handleClick = this.handleMenuItemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSelect=this.handleSelect.bind(this);
    this.handleToggle=this.handleToggle.bind(this);

    this.state = {
      anchorEl: null,
      expanded: [],
      selected: [],
      selectedCategoryId:null,
      openDialog:false,

      nodeIds:null,
      mouseX:0,
      mouseY:0
    };

    //this.props.getCategory('spell');
   }

  mongoObjectId=()=> {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }

  shouldComponentUpdate(nextProps, nextState) {

    // The CategoryFolder is Manage in this coomponent
    // spell is sending request trhough the command redux
    // all the other function are managed by the Spell Component 

    if (this.props.command !== nextProps.command){

      if(nextProps.command.command=="removeCategoryFolder" && nextProps.command._id){
        this.removeCategoryFolder(nextProps.command._id);
      }
      return false;

    }else{
      return true;
    }
  }

  handleMenuItemClick = (event, index, nodeIds) => {
    event.preventDefault();
    event.stopPropagation();

    if (nodeIds!=null){
      if (this.props.spellEvent && this.props.spellEvent.hasChanged==true){
        this.setState({anchorEl: null });
        this.setState({openDialog:true});
        this.setState({nodeIds:nodeIds});
      }
      else
        this.proceedSelect(nodeIds);
    }

    this.setState({
      mouseX: event.clientX,
      mouseY: event.clientY +16,
    });

    this.setState({ anchorEl: event.currentTarget });

    //
    // New folder
    //
    if (index==0){
      this.addCategoryFolder(this.state.selectedCategoryId,'New folder');
      this.setState({ anchorEl: null });
      let exp=[...this.state.expanded,this.state.selectedCategoryId];
      this.setState({expanded:exp}); // Pure Ux expanded once a subitem
    }
    
  }

  //
  // Save Change Dialog When Selecting a new Item on the TreeView
  // 

  handleDialogSaveCloseOk = event =>{ // OK Mean Save
    this.setState({openDialog:false});
    this.props.commandSpell({command:'generateSpellCodeSave'});
    this.proceedSelect(this.state.nodeIds);
  }

  handleDialogSaveCloseDismiss = event =>{
    this.setState({openDialog:false});
    this.proceedSelect(this.state.nodeIds);
    this.props.setEventSpell({hasChanged:false});
  }
 
  //
  // Treeview Method
  //

  handleClose = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ anchorEl: null });
  };

  handleToggle = (event, nodeIds) => {
    this.setState({expanded:nodeIds});
  };

  handleSelect = (event, nodeIds) => {
  
      this.proceedSelect(nodeIds);
  }
  
  proceedSelect=(nodeIds)=>{ 

    this.setState({selected:nodeIds}); 
    console.log(nodeIds);

    //
    // Lets find the selected item and send it to the redux store
    //

    let regex=RegExp("^(dvsrv_)","g");         // Device Service
    if (regex.test(nodeIds)){

      let bk=false;
      for (let plg of this.props.plugins){
        for (let dv of plg.devices){
          for (let srv of dv.services){
            if (srv._id===nodeIds.replace("dvsrv_", "")){  
              srv.type="deviceService";
              this.props.setActiveDeviceElement(srv);
              break;
            }
          }
          if (bk==true)
            break;
        }
        if (bk==true)
            break;
      }

    }
  }


  //
  // Get TreeItems
  //

  getTreeDeviceServiceItems = items =>{
    if(items==null)
      return;
    
    const classes = this.props.classes;

    try{
      return items.map(item => {
        let children = undefined;
  
        return (
          <TreeItem value={"dvsrv_"+item._id } classes={{label:classes.treeItem}} onContextMenu={((e) => this.handleClick(e,null,"dvsrv_"+item._id))}  key={"dvsrv_"+item._id} className={classes.title} nodeId={"dvsrv_"+item._id}  label={item.props.displayName} children={children} />
        );
      });
    }catch(e){
      console.log(e);
    }
  }

  getTreeDeviceItems = items =>{
    if(items==null)
      return;
    
    const classes = this.props.classes;

    try{
      return items.map(item => {
        let children = this.getTreeDeviceServiceItems(item.services);
        return (
          <TreeItem value={"dv_"+item._id } classes={{label:classes.treeItem}} onContextMenu={((e) => this.handleClick(e,null,"cat_"+item._id))}  key={"dv_"+item._id} className={classes.title} nodeId={"dv_"+item._id}  label={item.props.displayName} children={children} />
        );
      });
    }catch(e){
      console.log(e);
    }
  }



  getTreePluginItems = items => {
    if(items==null)
      return;
    
    const classes = this.props.classes;
    
    try{
      return items.map(item => {
        let children = undefined;
        
        let dvchildren=this.getTreeDeviceItems(item.devices);
        console.log(dvchildren);

        let srvchildren=undefined;

        children = [
          <TreeItem value={item.pluginName } classes={{label:classes.treeItem}} onContextMenu={((e) => this.handleClick(e,null,"plgsrv_"+item.pluginName))}  key={"plgsrv_"+item.pluginName} className={classes.title} nodeId={"plgsrv_"+item.pluginName}  label={"services"} children={srvchildren} />,
          <TreeItem value={item.pluginName } classes={{label:classes.treeItem}} onContextMenu={((e) => this.handleClick(e,null,"plgdv_"+item.pluginName))}  key={"plgdv_"+item.pluginName} className={classes.title} nodeId={"plgdv_"+item.pluginName}  label={"devices"} children={dvchildren} />
        ]
          
        
        let id="plg_"+item.pluginName;
        return (
          <TreeItem value={id} classes={{label:classes.treeItem}} onContextMenu={((e) => this.handleClick(e,null,id))}  key={id} className={classes.title} nodeId={id}  label={item.pluginName} children={children} />
        );
      });
    }catch(e){
      console.log(e);
    }
  }

  render = () => {
    const classes = this.props.classes;
    const { anchorEl } = this.state;
    const { expanded } = this.state;
    const { selected } = this.state;
    
    let {mouseY}=this.state;
    let {mouseX}=this.state;

    let mnu_spl=null;
    let tvContent=null;

    if (this.props.isSpellLoading==true){
      tvContent=
        <Box display="flex" width="100%" height="100%" alignItems="center" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
    }else{
      if (this.props.getAllError==true){
        tvContent=
          <Box display="flex" width="100%" height="100%" alignItems="center" justifyContent="center">
            <IconButton color="primary" aria-label="reload" onClick={function(){this.props.getCategory('spell'); this.props.getSpells()}.bind(this)} component="span">
              <RefreshIcon />
            </IconButton>
          </Box>
      }else{
        tvContent=
          <TreeView 
            className={classes.root2}
            defaultCollapseIcon={<FolderOutlinedIcon />}
            defaultExpandIcon={<AddBoxOutlinedIcon />}
            defaultEndIcon={<FolderOutlinedIcon />}
            expanded={expanded}
            selected={selected}
            multiSelect={false}
            onNodeToggle={this.handleToggle}
            onNodeSelect={this.handleSelect}>
              {this.getTreePluginItems(this.props.plugins)}
          </TreeView>
      }
    }

    return (
      <div onContextMenu={this.handleClose}> 
        <AppBar className={classes.navBar} position="static">
          <Toolbar variant="dense">
            <IconButton aria-controls="spellTreeviewMenu" aria-haspopup="true"  edge="start" onClick={this.handleClick} 
            color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Menu  anchorPosition={
              mouseY !== null && mouseX !== null ? { top: mouseY, left: mouseX }: undefined}
              anchorReference="anchorPosition"
              id="spellTreeviewMenu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}
              >
                <MenuItem key={3} dense={true} onClick={(event) => this.handleMenuItemClick(event, 0)} >
                  <ListItemIcon className={classes.ListItemIcon}><AddCircleIcon  fontSize="small" /></ListItemIcon>
                  <Typography align="left" variant="inherit">New Folder</Typography>
                </MenuItem>
                <MenuItem key={4} dense={true} onClick={(event) => this.handleMenuItemClick(event, 1)} >
                  <ListItemIcon className={classes.ListItemIcon}><DeleteOutlineSharpIcon  fontSize="small" /></ListItemIcon>
                  <Typography variant="inherit">Delete Folder</Typography>
                </MenuItem>
                <MenuItem key={5} dense={true} onClick={(event) => this.handleMenuItemClick(event, 3)} >______________</MenuItem>
                <MenuItem key={6} dense={true} onClick={(event) => this.handleMenuItemClick(event, 4)} >
                  <ListItemIcon className={classes.ListItemIcon}><AddCircleIcon  fontSize="small" /></ListItemIcon>
                  <Typography variant="inherit">New spell</Typography>
                </MenuItem>
              </Menu>
            <Typography variant="subtitle1" className={classes.title}>Device</Typography> 
            <IconButton color="inherit" aria-label="reload" onClick={function(){ this.props.getPlugins(); }.bind(this)} component="span">
              <RefreshIcon />
            </IconButton>
                   
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" style={{ height: '100%', margin: 0, padding: 0 }}>
            {tvContent}
        </Container>
      </div>
    )
  }
}

export default compose(withStyles(useStyles), connect(mapStateToProps,mapDispatchToProps))(DeviceTreeView);
