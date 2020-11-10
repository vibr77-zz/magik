import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';


import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import { adminSiteActions } from '../_actions';



const SiteTreeView = (props) => {

  const items =[{title:'test foog'}]; //useSelector(state => state.site.items);
  const {_callback}=props;

  const dispatch = useDispatch();

  var floors = useSelector(state => state.admSite.floors);

  useEffect(() => {
    dispatch(adminSiteActions.getFloors());
  }, []);

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
    navbar:{
      backgroundColor: "#dedede",
      minHeight: 36,
    },
    root2: {
      height: 240,
      flexGrow: 1,
      maxWidth: 400,
    },  
    title: {
      flexGrow: 1,
    },
    content: {
      flexGrow:1,
      display: "inline",
      alignContent:'flex-start'
    }
  }
);


  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
    dispatch(adminSiteActions.setActiveSiteItem({id:nodeIds,title:"WAHOO TO EASY"}));
  };

  const classes = useStyles();

  const getTreeItemsFromData = treeItems => {
  //console.log(treeItems);
  if (treeItems!=undefined)
  return treeItems.map(treeItemData => {
    let children = undefined;
    if (treeItemData.rooms && treeItemData.rooms.length > 0) {
      children = getTreeItemsFromData(treeItemData.rooms);
    }
    return (
      <TreeItem
        key={treeItemData.id}
        nodeId={treeItemData.id}
        label={treeItemData.title}
        children={children}
      />
    );
  });
};

  return (
    <div> <AppBar className={classes.navbar} position="static">
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu">
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
        Site
        </Typography>
        <Button color="inherit">+</Button>
        </Toolbar>
      </AppBar>
     <Container maxWidth="sm" style={{ height: '90vh', margin: 0, padding: 0 }}>
      <TreeView
          className={classes.root2}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={expanded}
          selected={selected}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
          >
        {getTreeItemsFromData(floors)}
      </TreeView> 
  </Container>
    </div>
  )
}


export default SiteTreeView;