import { combineReducers } from 'redux';

import user 				from './user.reducer';
import spell 				from './spell.reducer';
import device 			from './device.reducer';
import category 		from './category.reducer';
import admSite 			from './adm.site.reducer';
import snackbar 		from './snackbar.reducer';

const rootReducer = combineReducers({
  user,
  spell,
  device,
  category,
  admSite,
  snackbar
})

export default rootReducer;