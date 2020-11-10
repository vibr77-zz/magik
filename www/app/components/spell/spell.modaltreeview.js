import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const check = require('check-types');
const clone = require('clone');

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

// Material UI Declaration

import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import TreeView from '@material-ui/lab/TreeView';

// Material Ui Icon
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExtensionSharpIcon from '@material-ui/icons/ExtensionSharp';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';


import AllInclusiveOutlinedIcon from '@material-ui/icons/AllInclusiveOutlined';

import FolderIcon from '@material-ui/icons/Folder';
import TreeItem from '@material-ui/lab/TreeItem';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { categoryActions } from '../../_actions';
import { spellActions } from '../../_actions';

const mapStateToProps = function(state) {
  return {
    spell:    state.spell.active_item,
    spells:   state.spell.spells,
    command:  state.spell.command,
    category: state.category.category,
    selectedTreeViewItem:state.spell.selectedTreeViewItem
  }
}

const mapDispatchToProps = dispatch => ({
  getCategory: (categoryName) => dispatch(categoryActions.getCategory(categoryName)),
  saveSpell: (spell) => dispatch(spellActions.mutateSpell(spell)),
  saveCategory: (category) => dispatch(categoryActions.mutateCategory(category)),
  commandSpell:(command)=>dispatch(spellActions.commandSpell(command)),
});

const useStyles = theme =>({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
  Dialog:{
    maxWidth:"400px"
  },
  Header:{
    backgroundColor: "#888888",
    color:"#FFFFFF",
    fontWeight: 'small',
  },
  title: {
    flexGrow: 1,
    fontWeight: 'small',
  },
  content: {
    flexGrow:1,
    display: "inline",
    alignContent:'flex-start'
  },
});


class ModalSpellTreeView extends React.Component {

  constructor(props){
    super(props);
   
    this.handleClose = this.handleClose.bind(this);
    this.handleSelect= this.handleSelect.bind(this);
    this.handleToggle= this.handleToggle.bind(this);
  

    this.state = {
      expanded: [],
      selected: [],
      selectedCategoryId:null,
      scroll:'paper',
      open:props.open,
      _id:props._id
    };
   }

  handleClose = event => {
    event.stopPropagation();
    // Before to Close let's start to move obj

    if (this.props.selectedTreeViewItem && this.props.selectedTreeViewItem.type=='folder'){
      // let's move the folder
      // First find the folder tree to be moved

      let folderToBeMoved=clone(this._findCategoryObject(this.props.category,this.state._id));
      let objTree=clone(this.props.category);

      if (this._findRemoveCategoryObject(objTree,this.state._id)==true){
        let targetFolder=this._findCategoryObject(objTree,this.state.selectedCategoryId);
        if (targetFolder){
          targetFolder.subItem.push(folderToBeMoved);
          this.props.saveCategory(objTree);
        }
      }
    }

    if (this.props.selectedTreeViewItem && this.props.selectedTreeViewItem.type!='folder'){
      // This is a spell to move, and the spell is the  state.spell.active_item
      let sp=clone(this.props.spell);

      sp.props.categoryId=this.state.selectedCategoryId;
      this.props.saveSpell(sp);
    }

    this.setState({ open: false });
  };

  handleToggle = (event, nodeIds) => {
    event.stopPropagation();
    this.setState({expanded:nodeIds});
  };

  handleSelect = (event, nodeIds) => {

    this.setState({selected:nodeIds});
    this.setState({selectedCategoryId:nodeIds});
  }

  _onClick(event){ // Avoid Event to be bubble up 
    event.stopPropagation();
    return 0;
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

  getTreeItems = (treeItems,_idFolderToMove )=> {
    //console.log(_idFolderToMove);
    if(treeItems==null)
      return;
    
    let items=typeof(treeItems.data)=='object' ? treeItems.data : treeItems

    const classes = this.props.classes;
    try{
      if (items!=undefined)
        return items.map(item => {

          let children = undefined;
          if (item.subItem && item.subItem.length > 0) {
            children = this.getTreeItems(item.subItem, _idFolderToMove)
          }
          //console.log(children);
          if (item._id!=_idFolderToMove){ // We want to avoid a folder to be nested into a child after move ! 
            return (
              <TreeItem key={item._id} className={classes.title} nodeId={item._id}  label={item.displayName} children={children} />
            );
          }else{
            return '';
          }
      });
    }catch(e){
      console.log(e);
    }
  }

   componentDidUpdate(prevProps) {
      if(prevProps.open !== this.props.open) { // This.props.open is a number random
        this.setState({open: true});
      }

      if(prevProps._id !== this.props._id) {
        this.setState({_id: this.props._id});
      }
   }

  render = () => {
    const classes = this.props.classes;
    const { expanded } = this.state;
    const { selected } = this.state;
    const { open }       = this.state;
    
    return (
      <Box>
        <Dialog
          open={open}
          onClose={this.handleClose}
          scroll='paper'
          fullWidth={true}
          maxWidth='xs'
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description">
          <DialogTitle id="scroll-dialog-title" className={classes.Header}>Move Item</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
           
              <TreeView onClick={this._onClick}
                className={classes.root}
                defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
                defaultExpandIcon={<AddBoxOutlinedIcon />}
                defaultEndIcon={<FolderOutlinedIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={this.handleToggle}
                onNodeSelect={this.handleSelect}
                >
              {this.getTreeItems(this.props.category,this.state._id)}
              </TreeView> 
           
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Move
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  }
}

ModalSpellTreeView.defaultProps = {
  category: []
}

export default compose(withStyles(useStyles), connect(mapStateToProps,mapDispatchToProps))(ModalSpellTreeView);