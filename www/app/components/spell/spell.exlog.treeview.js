// React - Redux
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from "@material-ui/core/styles";

// Material Treeview
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

// Material Ui Icon
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListIcon from '@material-ui/icons/List';
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
import ReceiptIcon from '@material-ui/icons/Receipt';
import HomeIcon from '@material-ui/icons/Home';

const moment = require('moment');
const check = require('check-types');

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

class SpellExLogTreeView extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      anchorEl: null,
      expanded: [],
      selected: []
    };
   }
   
  handleToggle = (event, nodeIds) => {
    this.setState({expanded:nodeIds});
  }

  handleSelect = (event, nodeIds) => {
    this.setState({nodeIds:nodeIds});
  }

  getLogItem = (treeItems,idx) => {
    const classes = this.props.classes; 

    if(treeItems==null)
      return;
    
    let items=treeItems;
    
    if (check.array(treeItems)==false && typeof treeItems=="object"){
      let results=[];
      let children=undefined;
      let eFlag=false;
      for (let props in items){
        eFlag=true;
        let title;
        let children=null;
        let value=items[props];

        if (typeof value=="object"){
          children=this.getLogItem(value,idx);
          title=props;
        }
        else if (props==="start" || props==="end"){
          let tssmoment=moment(items[props]).format("DD/MM HH:mm:ss.SSS");
          title=props+": "+tssmoment;
        }else{
          title=props+": "+items[props];  
        }

        let icon=<ListIcon/>
        let key=props+"-"+idx;
        if (items._id)
          key=items._id+"-"+props+"-"+idx;
        
        results.push(<TreeItem  
                      classes={{label:classes.treeItem}} 
                      key={key} className={classes.title} 
                      nodeId={key}  
                      label={title} 
                      children={children} 
                      collapseIcon={icon} 
                      expandIcon={<AddBoxOutlinedIcon/>} 
                      endIcon={icon}/>)
      }
      if (eFlag==true)
        return results;
      else 
        return null;

    }else if (check.nonEmptyArray(items)){
      try{
          return items.map((item,idx_) => {
            
            let children = [];
            for (let props in item){
              let title;
              let value=item[props];
              let subchild=null;

              if (typeof value=="object"){
                title=props
                subchild=this.getLogItem(item[props],idx);
                
              }else if(props==="timestamp"){
                let tsdmoment=moment(item[props]).format("DD/MM HH:mm:ss.SSS");
                title=props+": "+tsdmoment;
              }else if (props==="start" || props==="end"){
                let tssmoment=moment(item[props]).format("DD/MM HH:mm:ss.SSS");
                title=props+": "+tssmoment;
              }else{
                title=props+": "+item[props];  
              }
              let icon=<ListIcon/>
              
              let key=props+idx;
              if (item._id)
                key=item._id+"-"+props+"-"+idx;

              children.push(<TreeItem  
                classes={{label:classes.treeItem}} 
                key={key} 
                className={classes.title} 
                nodeId={key} 
                collapseIcon={icon} 
                expandIcon={<AddBoxOutlinedIcon/>}  
                label={title} 
                children={subchild}/>
              );
            }

            let icon=<ListIcon/>
            if (item._id)
                icon=<ExtensionSharpIcon/>

            let tsmoment=moment(item.timestamp).format("HH:mm:ss.SSS");
            let title='';
            if (item.type)
              title+=item.type+" - ";
            
            if (item.methodName)
              title+=item.methodName+" - ";
            
            title+=tsmoment;

            let key=idx_+idx;
              if (item._id)
                key=item._id+"-"+idx_+"-"+idx;

            return (
              <TreeItem value={item._id } 
                classes={{label:classes.treeItem}} 
                key={key} 
                className={classes.title} 
                nodeId={key}  
                collapseIcon={icon} 
                expandIcon={<AddBoxOutlinedIcon/>} 
                endIcon={icon} 
                label={title} 
                children={children}/>
            );
        });
      }catch(e){
        console.log(e);
      }
    }
  }

  render(){
    const classes = this.props.classes;
    const { expanded } = this.state;
    const { selected } = this.state;
    
    let exLog=[];
    let icon=<HomeIcon/>

    if (this.props.spell){
      for (let idx in this.props.spell.executionLog){
        
        let ex=this.props.spell.executionLog[idx];
        let child=this.getLogItem(ex,idx);
        let label='Execution '
        if (ex.start)
          label+=moment(ex.start).format("DD/MM HH:mm:ss");
        
        
        exLog.push(<TreeItem 
                classes={{label:classes.treeItem}} 
                key={label} 
                className={classes.title} 
                nodeId={label}  
                collapseIcon={icon} 
                expandIcon={<HomeIcon/>} 
                endIcon={icon} 
                label={label} 
                children={child}/>
            );
      }
    }

    return(
      <TreeView 
          
        defaultCollapseIcon={<FolderOutlinedIcon />}
        defaultExpandIcon={<AddBoxOutlinedIcon />}
        defaultEndIcon={<ListIcon/>}
        expanded={expanded}
        selected={selected}
        multiSelect={false}
        onNodeToggle={this.handleToggle}
        onNodeSelect={this.handleSelect}>
        {exLog}
          
      </TreeView>
    )
  }
}

export default compose(withStyles(useStyles), connect(mapStateToProps,mapDispatchToProps))(SpellExLogTreeView);


