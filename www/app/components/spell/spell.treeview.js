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


import { categoryActions } from '../../_actions';
import { spellActions } from '../../_actions';

import SpellDialog from "./spell.dialog";

const mapStateToProps = function(state) {
  return {
    spell:    state.spell.active_item,
    spells:   state.spell.spells,
    spellEvent: state.spell.event,
    isSpellLoading:state.spell.loading,
    getAllError:state.spell.getAllError,
    command:  state.spell.command,
    category: state.category.category,
    selectedTreeViewItem: state.spell.selectedTreeViewItem
  }
}

const mapDispatchToProps = dispatch => ({

  setActiveSpell:(spell)=>dispatch(spellActions.setActiveItem(spell)),
  getSpells: (spells) => dispatch(spellActions.getAll()),
  getCategory: (categoryName) => dispatch(categoryActions.getCategory(categoryName)),
  saveCategory: (category) => dispatch(categoryActions.mutateCategory(category)),
  setTreeViewSelectedItem:(item)=>dispatch(spellActions.setTreeViewSelectedItem(item)),
  commandSpell:(command)=>dispatch(spellActions.commandSpell(command)),
  setEventSpell:(event)=>dispatch(spellActions.setSpellEvent(event)),

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

class SpellTreeView extends React.Component {

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

    this.props.getCategory('spell');
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
    //
    // Delete Folder
    //

    else if (index==1){ // Delete Category
      this.setState({openDeleteDialog:true});
      this.setState({ anchorEl: null });
    }

    //
    // New Spell
    //

    else if (index==4){ // New Spell
      let _id=this.state.selectedCategoryId.replace("cat_", "");
      let exp=[...this.state.expanded,this.state.selectedCategoryId];
      this.setState({expanded:exp}); // Pure Ux expanded once a subitem is created // do not forget to remove the cat_ prefix
      this.props.commandSpell({command:'createSpell',displayName:"New Spell",categoryId:_id});
      this.setState({ anchorEl: null });
    }

    //
    // Execute Spell
    //

    else if (index==(5)){ 
        this.props.commandSpell({command:'executeSpell',_id:this.props.spell._id});
        this.setState({ anchorEl: null });
    }

    //
    // Delete Spell
    //

    else if (index==6){ // delete Spell
      this.props.commandSpell({command:'deleteSpell',_id:this.props.spell._id});
      this.setState({ anchorEl: null });
    }

    //
    // Clone Spell
    //


    else if (index==7){ // clone Spell
      this.props.commandSpell({command:'cloneSpell',sp:this.props.spell});
      this.setState({ anchorEl: null });
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
    if (this.props.spellEvent && this.props.spellEvent.hasChanged==true){
      this.setState({openDialog:true});
      this.setState({nodeIds:nodeIds});
    }
    else
      this.proceedSelect(nodeIds);
  }
  
  proceedSelect=(nodeIds)=>{ 

    if (nodeIds=="cat_unassigned")
      return;
    
    console.log(this.props.spell);
    this.setState({selected:nodeIds});
    let regex=RegExp("^(?!cat_)","g");
    if (regex.test(nodeIds)){
      for (let spell of this.props.spells){
        if (spell._id==nodeIds){
          this.props.setActiveSpell(spell);
          this.props.setTreeViewSelectedItem(spell);
          this.setState({selectedCategoryId:spell.props.categoryId});
          break;
        }
      }
    }else{
      this.setState({selectedCategoryId:nodeIds});
      let cat=this._findCategoryObject(this.props.category,nodeIds.replace("cat_", ""))
      this.props.setTreeViewSelectedItem({type:"folder",displayName:cat.displayName,"_id":nodeIds.replace("cat_", "",)});
    }
  }

  _findCategoryObject(objTree,_id){
    let ret=null;
    let entries=check.object(objTree) ? objTree.data:objTree;
    
    if (check.nonEmptyArray(entries)){
      for (const entry of entries) {
        if (_id==entry._id){

          return entry;
        }
        if (check.nonEmptyArray(entry.subItem)){
          ret=this._findCategoryObject(entry.subItem,_id);
          if (ret!=null)
            return ret;
        }
      }
    }
    return ret;
  }

  addCategoryFolder(parentId,displayName){
    if (parentId==null)
      return;

    let _id=parentId.replace("cat_", "");
    let parentFolder=this._findCategoryObject(this.props.category,_id);

    if (parentFolder!=null){
      let newFolder={
        _id:this.mongoObjectId(),
        displayName:displayName,
        subItem:[]
      }
      parentFolder.subItem.push(newFolder);
      this.props.saveCategory(this.props.category);
    }
  }

  _findRemoveCategoryObject(objTree,_id){
    let ret=null;
    let entries=check.object(objTree) ? objTree.data:objTree;
    if (check.nonEmptyArray(entries)){
      for (const idx in entries) {
        let entry=entries[idx];
        if (_id==entry._id){
          entries.splice(idx,1);
          return true;
        }

        if (check.nonEmptyArray(entry.subItem)){
          ret=this._findRemoveCategoryObject(entry.subItem,_id);
          if (ret!=null)
            return true;
        }
      }
    }
    return ret;
  }

  removeCategoryFolder(_id){
    if( _id==null)
      return;

    let _id_=_id.replace("cat_", "");
    let res=this._findRemoveCategoryObject(this.props.category,_id_);
    if (res==true)
      this.props.saveCategory(this.props.category);
  }

  //
  //  Get All spells unassigned
  //  to a valid CategroyFolder
  //


  getUnAssignedSpellTreeItems=()=>{
    let child=[];
    const classes = this.props.classes; 

    if (!this.props.spells)
      return;

    for (let sp of this.props.spells){
      if (sp.props.categoryId==null || this._findCategoryObject(this.props.category,sp.props.categoryId)==null){
        child.push(sp);
      }
    }
    let eflag=false;
    let retChild=child.map((sp)=>{
      eflag=true;
      return (
        <TreeItem key={sp._id} classes={{label:classes.treeItem}} value={sp._id} onContextMenu={((e) => this.handleClick(e,null,sp._id))} nodeId={sp._id} endIcon={<AllInclusiveOutlinedIcon/>} label={sp.props.displayName} />
      );
    })
    if (eflag==true){
      return (
        <TreeItem key={"UNASSIGNED"} classes={{label:classes.treeItem,root:classes.selected}} className={classes.title} collapseIcon={<HealingIcon/>} endIcon={<HealingIcon/>} nodeId={"cat_unassigned"}  label={"Unassigned"} children={retChild} />
      );
    }else
      return undefined;

  }

  getSpellTreeItems = categoryId =>{
    const classes = this.props.classes;    
    if (!this.props.spells)
      return;

    let eflag=false; 
    let ret= this.props.spells.map((spell)=>{  
      if (spell.props.categoryId==categoryId){
        eflag=true; // at least one is valid
        return (
          <TreeItem  classes={{label:classes.treeItem,root:classes.selected}} key={spell._id} value={spell._id} onContextMenu={((e) => this.handleClick(e,null,spell._id))}  nodeId={spell._id} endIcon={<AllInclusiveOutlinedIcon/>} label={spell.props.displayName} />
        );
      }
    });

    if (eflag==true) // This is important to avoid empty children at folder level
      return ret;
    else
      return undefined
  }

  getTreeItems = treeItems => {
    if(treeItems==null)
      return;
    
    console.log(treeItems);
    let items=typeof(treeItems.data)=='object' ? treeItems.data : treeItems
    const classes = this.props.classes;
    try{
      if (items!=undefined)
        return items.map(item => {
          let children = undefined;
          if (item.subItem && item.subItem.length > 0) {
            children = this.getTreeItems(item.subItem)
          }
          children=children ? children.concat(this.getSpellTreeItems(item._id)): this.getSpellTreeItems(item._id) ;
          return (
            <TreeItem value={item._id } classes={{label:classes.treeItem}} onContextMenu={((e) => this.handleClick(e,null,"cat_"+item._id))}  key={item._id} className={classes.title} nodeId={"cat_"+item._id}  label={item.displayName} children={children} />
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
      tvContent=<Box display="flex" width="100%" height="100%" alignItems="center" justifyContent="center">
                  <CircularProgress color="primary" />
                </Box>
    }else{
      if (this.props.getAllError==true){
         tvContent=<Box display="flex" width="100%" height="100%" alignItems="center" justifyContent="center">
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
                  {this.getTreeItems(this.props.category)}
                  {this.getUnAssignedSpellTreeItems()}
              </TreeView>
      }
    }

    if (this.props.selectedTreeViewItem && this.props.selectedTreeViewItem.type!="folder"){
      mnu_spl=[
        <MenuItem key={0} dense={true} onClick={(event) => this.handleMenuItemClick(event, 7)} >
          <ListItemIcon className={classes.ListItemIcon}><LibraryBooksIcon fontSize="small" /></ListItemIcon>
          <Typography variant="inherit">Clone spell</Typography>
        </MenuItem>,
        <MenuItem key={1} dense={true} onClick={(event) => this.handleMenuItemClick(event, 5)} >
          <ListItemIcon className={classes.ListItemIcon}><PowerSettingsNewIcon fontSize="small" /></ListItemIcon>
          <Typography variant="inherit">Execute spell</Typography>
        </MenuItem>,
        <MenuItem key={2} dense={true} onClick={(event) => this.handleMenuItemClick(event, 6)} >
          <ListItemIcon className={classes.ListItemIcon}><DeleteOutlineSharpIcon  fontSize="small" /></ListItemIcon>
          <Typography variant="inherit">Delete Spell</Typography>
        </MenuItem>
      ]
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
                {mnu_spl}
              </Menu>
            <Typography variant="subtitle1" className={classes.title}>Spell</Typography> 
            <IconButton color="inherit" aria-label="reload" onClick={function(){this.props.getCategory('spell'); this.props.getSpells()}.bind(this)} component="span">
              <RefreshIcon />
            </IconButton>
                   
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" style={{ height: '100%', margin: 0, padding: 0 }}>
            {tvContent}
        </Container>
        
      <SpellDialog 
        title={"Changes have been made"} 
        message={"Item has changed, do you want to save the changes before switching or to dismiss the change?"}
        openDialog={this.state.openDialog}
        handleDialogCloseDismiss={this.handleDialogSaveCloseDismiss}
        handleDialogCloseOk={this.handleDialogSaveCloseOk}
        handleDialogClose={this.handleDialogSaveCloseDismiss}
        dismissLabel={"Dismiss"}
        okLabel={"Save"}
      />

    </div>
    )
  }
}

SpellTreeView.defaultProps = {
  category: []
}

export default compose(withStyles(useStyles), connect(mapStateToProps,mapDispatchToProps))(SpellTreeView);