
import { withStyles } from "@material-ui/core/styles";

// Material UI Core & component
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';

// React - Redux
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Material UI Declaration
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import ExtensionSharpIcon from '@material-ui/icons/ExtensionSharp';
import RefreshIcon from '@material-ui/icons/Refresh';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Material UI Icon 
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';

import { spellActions } from '../../_actions';
import { snackbarActions } from '../../_actions';
import { deviceActions } from '../../_actions';

import CategoryForm from './categoryform'
import SpellForm from './spell.form'
import SpellTreeView from './spell.treeview'
import SpellExLogTreeView from './spell.exlog.treeview'
import ModalSpellTreeView from './spell.modaltreeview'
import SpellBlockly from './spell.blockly'
import SpellDialog from "./spell.dialog";

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const clone=require('clone');
const Mousetrap = require("mousetrap");

function TabPanel(props) {
  const { children, selectedTab, index, ...other } = props;
  console.log(selectedTab);

  const useStyles = makeStyles(theme => ({
    panelContent2:{
      opacity:1,
      height:"100%",
      backgroundColor: '#EEEEEE',

    }
  }));

  const classes = useStyles();

  return (
    
    <div
      className={classes.panelContent2} style={{ overflowY: 'auto',height:"calc(100% - 48px)", zIndex: 2, margin: 0, padding: 0 }}
      role="tabpanel"
      hidden={selectedTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {selectedTab === index && (
          <div style={{ overflowY: 'auto',height:"100%", zIndex: 2, margin: 0, padding: 0 }}>{children}</div>
      )}
    </div>
  );
}


const mapStateToProps = function(state) {
  return {
    spell: state.spell.active_item,
    spellEvent: state.spell.event,
    command: state.spell.command,
    isSpellLoading:state.spell.loading,
    selectedTreeViewItem:state.spell.selectedTreeViewItem,
    devices:state.device.devices,
  }
}

const mapDispatchToProps = dispatch => ({
  createSpell: (sp) => dispatch(spellActions.createSpell(sp)),
  executeSpell: (_id) => dispatch(spellActions.executeSpell(_id)),
  deleteSpell: (_id) => dispatch(spellActions.deleteSpell(_id)),
  saveSpell: (spell) => dispatch(spellActions.mutateSpell(spell)),
  getSpells: (spells) => dispatch(spellActions.getAll()),
  getSpell: (_id) => dispatch(spellActions.getSpell(_id)),
  setActiveSpell:(spell)=>dispatch(spellActions.setActiveItem(spell)),
  commandSpell:(command)=>dispatch(spellActions.commandSpell(command)),
  setEventSpell:(event)=>dispatch(spellActions.setSpellEvent(event)),
  snack:(notification)=>dispatch(snackbarActions.enqueueSnackbarAction(notification)),
  getDevices: () => dispatch(deviceActions.getAll()),
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
  title_w: {
    flexGrow: 1,
    fontWeight: 'small',
    color:"#FFFFFF",
    width:"50%"
  },
  content: {
    flexGrow:1,
    display: "inline",
    alignContent:'flex-start'
  },
  ListItemIcon:{
    width:"10px",
    marginRight:"-25px"
  },
  icoButton:{
    color: "pink"
  },
  blockly:{
    marginLeft:0,
    paddingLeft:0,
    align:'left'
  },
  indicator: {
    backgroundColor: 'white',
  },

});



class Spell extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      anchorEl: null,
      isModalOpen:false,
      openDeleteDialog:false,
      openExecutionDialog:false,
      openSaveDialog:false,
      mouseX:0,
      mouseY:0,
      selectedTab:0,
    };

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.props.getSpells();
    this.props.getDevices();
    this.nextActionHook=null;
   }

  handleMenuItemClick = (event, index) => {
    event.stopPropagation();

    this.setState({
      mouseX: event.clientX,
      mouseY: event.clientY +16,
  
    });

    if (this.props.selectedTreeViewItem==undefined)
      return;

    this.setState({ anchorEl: event.currentTarget });
    
    if (index==0){
      this.props.commandSpell({command:'generateCode'});
      this.setState({ anchorEl: null });
    }
    else if (index==1){
      this.props.commandSpell({command:'rebuild'});
      this.setState({ anchorEl: null });
    }
    else if (index==2){
      this.props.commandSpell({command:'clearWorkspace'});
      this.setState({ anchorEl: null });
    }
    else if (index==4){
      this.props.executeSpell(this.props.spell._id);
      this.setState({ anchorEl: null });
    }
    else if (index==5){
      this.props.commandSpell({command:'generateSpellCodeSave'});
      this.setState({ anchorEl: null });
    }
    else if (index==6){
      this.props.spell.executionLog=[];
      this.props.saveSpell(this.props.spell);
      this.setState({ anchorEl: null });
    }
    else if (index==9){
      this.setState({isModalOpen:new Date().getTime() + Math.random()});
      this.setState({ anchorEl: null });
    }
  }
  handleChange = panel => (event, isExpanded) => {
    if (isExpanded==true)
      this.setState({exp:'panel1'});
    else
       this.setState({exp:null});
  };

   handleChangeTab = (event, newValue) => {
    this.setState({selectedTab:newValue});
  };

   handleChangeIndex = (index) => {
    this.setState({selectedTab:index});
  };

  handleClose = event => {
    event.stopPropagation();
    this.setState({ anchorEl: null });
  };

  //
  // Dialog Delete Confirmation
  //

  handleDialogDeleteCloseOk = event =>{ // OK Mean Save
    this.setState({openDeleteDialog:false});
    if (this.props.selectedTreeViewItem.type=='folder'){
      this.props.commandSpell({command:'removeCategoryFolder',_id:this.props.selectedTreeViewItem._id});
    }else{
      this.props.deleteSpell(this.props.spell._id);
    }
  }

  handleDialogDeleteClose = event =>{
    this.setState({openDeleteDialog:false});
  }

  //
  // Execcution Dialog to change Status
  //

  handleDialogExecuteCloseOk = event =>{ // OK Mean Save
    this.setState({openExecutionDialog:false});
    // Change Status
    this.props.spell.props.status=true;
    this.props.saveSpell(this.props.spell);
  }

  handleDialogExecuteClose = event =>{
    this.setState({openExecutionDialog:false});
  }

  //
  // Save Dialog
  //

  handleDialogSaveCloseOk = event =>{
    this.setState({openSaveDialog:false});
    this.props.commandSpell({command:'generateSpellCodeSave'});
  }

  handleDialogSaveClose = event =>{
    this.setState({openSaveDialog:false});
    return;
  }

  //
  // receive Command from other Component
  //


  shouldComponentUpdate(nextProps, nextState) {

    if (this.props.command !== nextProps.command){
      if(nextProps.command.command=="deleteSpell" && nextProps.command._id){
        this.setState({openDeleteDialog:true});
      }
      else if (nextProps.command.command=="executeSpell" && nextProps.command._id){
        if (this.props.spell.props.status==false){
          this.setState({openExecutionDialog:true})
        }else{
          this.props.executeSpell(nextProps.command._id);
        }
      }
      else if (nextProps.command.command=="createSpell" && nextProps.command.displayName && nextProps.command.categoryId){
        if (this.props.spell && this.props.spell.props.status==false){
          this.setState({openSaveDialog:true})
        }else{
          this.props.createSpell({props:{displayName:nextProps.command.displayName,categoryId:nextProps.command.categoryId}});
        }
      }
      else if (nextProps.command.command=="cloneSpell" && nextProps.command.sp){
        if (this.props.spell && this.props.spell.props.status==false){
          this.setState({openSaveDialog:true})
        }else{
          let cln=clone(nextProps.command.sp);
          cln.props.displayName='Clone '+ cln.props.displayName;
          delete(cln._id);
          this.props.createSpell(cln);
        }
      }    
    }

    if (this.props.selectedTreeViewItem !== nextProps.selectedTreeViewItem){
      if (nextProps.selectedTreeViewItem && nextProps.selectedTreeViewItem.type=='folder'){
        this.setState({exp:'panel1'});
      }
      else{
        this.setState({exp:null});
      }
    }
    return true;
  }
  
  componentDidMount(){

    Mousetrap.bind(['command+s', 'ctrl+s'], function() {
      if (this.props.selectedTreeViewItem.type=='folder'){
        
      }else if (this.props.spell){
        this.props.commandSpell({command:'generateSpellCodeSave'});
      }
        // return false to prevent default browser behavior
        // and stop event from bubbling
      return false;
    }.bind(this));


    Mousetrap.bind(['ctrl+n'], function() {
      
      if (this.props.spellEvent.hasChanged==true){
        this.setState({openSaveDialog:true});
        return false;
      }


      if (this.props.selectedTreeViewItem && this.props.selectedTreeViewItem.type=='folder'){
        console.log(this.props.selectedTreeViewItem);
        this.props.createSpell({props:{displayName:"New Spell",categoryId:this.props.selectedTreeViewItem._id}});
      }

      else if (this.props.selectedTreeViewItem){ // Assume it is a spell
        // Get the Category id from spell.props.categoryId
        this.props.createSpell({props:{displayName:"New Spell",categoryId:this.props.selectedTreeViewItem.props.categoryId}});
      }

      return false;
    }.bind(this));

    Mousetrap.bind(['command+backspace','ctrl+backspace'], function() {
        this.setState({openDeleteDialog:true});
        return false;
    }.bind(this));

    Mousetrap.bind(['command+e', 'ctrl+e'], function() {
        
      if (this.props.selectedTreeViewItem.type=='folder'){

      }else if (this.props.spell){

        if (this.props.spellEvent.hasChanged==true){
          this.setState({openSaveDialog:true});
          return;
        }

        if (this.props.spell.props.status==false){
          this.setState({openExecutionDialog:true})
          return;
        }else{
          this.props.executeSpell(nextProps.command._id);
        }
      }
      // return false to prevent default browser behavior
      // and stop event from bubbling
      return false;
    }.bind(this));
  }

  componentWillUnmount(){
    Mousetrap.unbind("ctrl+s");
    Mousetrap.unbind("command+s");
    Mousetrap.unbind("ctrl+n");
    Mousetrap.unbind("command+n");

    Mousetrap.unbind("ctrl+e");
    Mousetrap.unbind("command+e");

    Mousetrap.unbind("ctrl+backspace");
    Mousetrap.unbind("command+backspace");
  }

  a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  render() {
    const classes = this.props.classes;
    const { anchorEl } = this.state;
    
    let form='';
    let title='';
    let appBarTitle='';
    let blk='';
    let _id=null;
    
    const {isModalOpen}=this.state;
    
    let mnuCtx=''; // Menu in Context
    let mnuCmn=''; // Menu in Common
    let tabList=null;

    let {exp}=this.state;

    let {mouseY}=this.state;
    let {mouseX}=this.state;

    let tvContent=null
  
    if (this.props.selectedTreeViewItem){

      mnuCmn=[
        <MenuItem dense={true} key={8} onClick={(event) => this.handleMenuItemClick(event, 9)}>
          <ListItemIcon className={classes.ListItemIcon}><MoveToInboxIcon fontSize="small" /></ListItemIcon>
          <Typography variant="inherit">Move item</Typography>
        </MenuItem>
      ]
      _id=this.props.selectedTreeViewItem._id;
     
      if (this.props.selectedTreeViewItem.type=='folder'){
        
        form=<CategoryForm/>
        title='> Folder form';
        appBarTitle=this.props.selectedTreeViewItem.displayName? this.props.selectedTreeViewItem.displayName:''; //
        blk='';
        mnuCtx;

        tabList=[ 
                <Tab label="Folder Form"    {...this.a11yProps(0)} />
                ]
      } else if (this.props.spell){
        
        tabList= [
                <Tab label="Spell form"  {...this.a11yProps(0)} />,
                <Tab label="Blocks"  {...this.a11yProps(1)} />,
                <Tab label="Log"    {...this.a11yProps(2)} />
                ];

        form=<SpellForm/>
        title='> Spell form';
        appBarTitle=this.props.spell.props.displayName;
        blk=<SpellBlockly className={classes.blockly}/>
        
        mnuCtx=[
          <MenuItem dense={true} key={0} onClick={(event) => this.handleMenuItemClick(event, 0)}>
            <ListItemIcon className={classes.ListItemIcon}><ExtensionSharpIcon fontSize="small" /></ListItemIcon>
            <Typography variant="inherit">Generate Code</Typography>
          </MenuItem>,
          <MenuItem key={2} dense={true} onClick={(event) => this.handleMenuItemClick(event, 2)}>
            <ListItemIcon className={classes.ListItemIcon}><ClearAllIcon fontSize="small" /></ListItemIcon>
            <Typography variant="inherit">Clear workspace</Typography>
          </MenuItem>,
          <MenuItem key={3} dense={true} onClick={(event) => this.handleMenuItemClick(event, 3)}>
          <ListItemIcon className={classes.ListItemIcon}><AddCircleIcon fontSize="small" /></ListItemIcon>
            <Typography variant="inherit">Create Spell</Typography>
          </MenuItem>,
          <MenuItem key={4} dense={true} onClick={(event) => this.handleMenuItemClick(event, 4)}>
            <ListItemIcon className={classes.ListItemIcon}><PowerSettingsNewIcon  fontSize="small" /></ListItemIcon>
            <Typography variant="inherit" align="left">Execute spell (ctrl-e) </Typography>
          </MenuItem>,
          <MenuItem key={5} dense={true} onClick={(event) => this.handleMenuItemClick(event, 5)}>
            <ListItemIcon className={classes.ListItemIcon}><SaveAltIcon  fontSize="small" /></ListItemIcon>
            <Typography variant="inherit">Save Spell</Typography>
          </MenuItem>,
           <MenuItem key={6} dense={true} onClick={(event) => this.handleMenuItemClick(event, 6)}>
            <ListItemIcon className={classes.ListItemIcon}><ClearAllIcon  fontSize="small" /></ListItemIcon>
            <Typography variant="inherit">Clear execution Log</Typography>
          </MenuItem>
        ]
      }
    }

    return(
    
      <Grid className={classes.root} container spacing={1}>
        
        <Grid item xs={2}>
          <Paper className={classes.root} spacing={1}>
            <SpellTreeView/>
          </Paper>
        </Grid>

        <Grid className={classes.root} item xs={10} zIndex={100}>
          <AppBar className={classes.navBar} position="static" color="default">
            <Toolbar variant="dense" className={classes.title}>
              <IconButton aria-controls="spellMenu" aria-haspopup="true"  edge={false} onClick={this.handleMenuItemClick} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
               <Tabs 
                classes={{indicator: classes.indicator}}
                value={this.state.selectedTab}
                onChange={this.handleChangeTab}
                indicatorColor="primary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
                centered>
                {tabList}
              </Tabs>
              <Typography variant="subtitle1" className={classes.title_w}>
                 {} {this.props.spellEvent && this.props.spellEvent.hasChanged ? 
                   <IconButton className={classes.icoButton}
                    onClick={(event) => {
                      event.stopPropagation();
                      this.props.commandSpell({command:'generateSpellCodeSave'}); 
                    }}
                    >
                    <CloudUploadIcon/></IconButton>
        
                  :''}
                  { this.props.spell?
                    <IconButton color="inherit"
                      onClick={(event) => {event.stopPropagation(); 
                      this.props.getSpell(this.props.spell._id);}}
                    >
                      <RefreshIcon/>
                    </IconButton>
                 :''}
              </Typography>
              <Menu id="spellMenu" 
                anchorPosition={
                  mouseY !== null && mouseX !== null ? { top: mouseY, left: mouseX }: undefined}
                  anchorReference="anchorPosition"
                  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}
                >
                  {mnuCmn}
                  {mnuCtx}
              </Menu>
              <ModalSpellTreeView open={isModalOpen} _id={_id}/>
          
             
            </Toolbar>
          </AppBar>
          <TabPanel   selectedTab={this.state.selectedTab} index={0} >
              <Paper square elevation={1}>{form}</Paper>
          </TabPanel>
          <TabPanel selectedTab={this.state.selectedTab} index={1} >
            <div id={"blocklyArea"} style={{ height: '100%', margin: 0, padding: 0 }} >
              {blk}
            </div>
           
          </TabPanel>
          <TabPanel selectedTab={this.state.selectedTab} index={2} >
            <Paper square elevation={0}><SpellExLogTreeView/></Paper>
          </TabPanel>
        </Grid>
 
          <SpellDialog 
          title={"Spell execution issue"} 
          message={"Spell status is set to false, do you want to change Spell status to true?"}
          openDialog={this.state.openExecutionDialog}
          handleDialogCloseDismiss={this.handleDialogExecuteClose}
          handleDialogCloseOk={this.handleDialogExecuteCloseOk}
          handleDialogClose={this.handleDialogExecuteClose}
          dismissLabel={"Dismiss"}
          okLabel={"Change"}
          />
          <SpellDialog 
          title={"Delete confirmation"} 
          message={"Are you sure you want to delete this item?"}
          openDialog={this.state.openDeleteDialog}
          handleDialogCloseDismiss={this.handleDialogDeleteClose}
          handleDialogCloseOk={this.handleDialogDeleteCloseOk}
          handleDialogClose={this.handleDialogDeleteClose}
          dismissLabel={"Cancel"}
          okLabel={"Delete"}
          />  
          <SpellDialog 
          title={"Save confirmation"} 
          message={"Item has changed, do you want to save the changes before creating or to dismiss the change?"}
          openDialog={this.state.openSaveDialog}
          handleDialogCloseDismiss={this.handleDialogSaveClose}
          handleDialogCloseOk={this.handleDialogsaveCloseOk}
          handleDialogClose={this.handleDialogSaveClose}
          dismissLabel={"Cancel"}
          okLabel={"Save"}
          />  
      </Grid>
    );
  }
}

export default compose(withStyles(useStyles), connect(mapStateToProps,mapDispatchToProps))(Spell);
