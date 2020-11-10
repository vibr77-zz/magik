import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { spellActions } from '../_actions';


const SceneCount = () => {

  const spells = useSelector(state => state.spell.spells);


  return(
    <div>
      {spells ? spells.length:<h1>Loading Data</h1>}
          
    </div>
  )
}


export default SceneCount;

