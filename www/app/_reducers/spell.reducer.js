import { spellConstants } from '../_constants';


const spell=(state = {}, action) =>{
	//console.log('action:',action);
	
	switch (action.type) {

    case spellConstants.SET_SPELL_EVENT:
        return{...state,event:action.item};

    case spellConstants.SET_TREEVIEW_SELECTED_ITEM:
        return {...state,selectedTreeViewItem:action.item};

    case spellConstants.COMMAND_REQUEST:
        return {...state,command:action.command};
        
	case spellConstants.SET_ACTIVE_ITEM:
        return { ...state, active_item: action.item }
    
    //
    // New Spell Creation Request
    //
    
    case spellConstants.CREATE_REQUEST:
    	return { ...state,loading: true };

    case spellConstants.CREATE_SUCCESS:
    	return { ...state, active_item:action.item, loading:false}

    case spellConstants.CREATE_FAILURE:
    	return { ...state,error:action.error}


    //
    //  Spell Mutate Request
    //
    
    case spellConstants.MUTATE_REQUEST:
    	return { ...state,loading: true };

    case spellConstants.MUTATE_SUCCESS:
    	return { ...state, active_item:action.item, loading:false,nextDispatch:action.nextDispatch}

    case spellConstants.MUTATE_FAILURE:
    	return { ...state,error:action.error}


    //
    // Get Execute Spell Request
    //	

    case spellConstants.EXECUTE_REQUEST:
		return { ...state,loading: true };
		
	case spellConstants.EXECUTE_SUCCESS:
		return { ...state, loading:false };
		
	case spellConstants.EXECUTE_FAILURE:
		return { ...state,error: action.error };

    //
    // Get Get Spell Request
    //  

    case spellConstants.GETSPELL_REQUEST:
            return { ...state,loading: true };
        
    case spellConstants.GETSPELL_SUCCESS:
        let spells=state.spells;
        for(let sp of spells){
            if (sp._id === action.item._id){
                console.log("Yoouuuuuuuuu");
                console.log(action.item);
                sp=action.item;
                break;
            }
        }

        return { ...state,spells:spells,active_item:action.item,loading:false };
            
        
    case spellConstants.GETSPELL_FAILURE:
        return { ...state,error: action.error };


    //
    // Get All Spells
    //	

		case spellConstants.GETALL_REQUEST:
			return { ...state,loading: true };
		
		case spellConstants.GETALL_SUCCESS:
			return { ...state, spells: action.spells, getAllError:false,loading:false };
		
		case spellConstants.GETALL_FAILURE:
			return { ...state,getAllError:true,error: action.error,loading:false };
		
		//
		// Not Handled return the state
		//

		case spellConstants.DELETE_REQUEST:
    	return { ...state,loading: true };

    case spellConstants.DELETE_SUCCESS:
    	return { ...state, active_item:null, loading:false}

    case spellConstants.DELETE_FAILURE:
    	return { ...state,error:action.error}


		default:
      return state
	}
}

export default spell;