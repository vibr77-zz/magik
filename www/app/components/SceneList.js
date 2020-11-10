
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import { spellActions } from '../_actions';
//import Scene from './Scene'

const SceneList = () => {

  var spells = useSelector(state => {
    console.log(state.spell);
    return state.spell.spells
  });
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(spellActions.getAll());
  }, []);

  const handleClick = (action,_id,index) => {
    console.log("click id:"+_id);
    if (action=='select')
      dispatch(spellActions.setActiveItem(spells[index]));
    else if(action=='delete')
      dispatch(spellActions.deleteSpell(spells[index]._id));
  };

  return(
    <ul>
      {spells ? spells.map((spell, index) =>
        <li key={spell._id}><Link onClick={() => handleClick('select',spell._id,index)}>{spell.props.displayName}</Link>
        &nbsp;<Link onClick={() => handleClick('delete',spell._id,index)}>(Trash)</Link></li> ):<h1>Loading Data</h1>}   
    </ul>

  )
}

export default SceneList;