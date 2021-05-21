import {createStore,combineReducers} from 'redux'

const INITIAL_STATE={isSignedIn:null,payload:null}

const authReducer= (state=INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case 'SIGN_IN':
            return {...state,isSignedIn:true,payload:action.payload}
        case 'SIGN_OUT':
            return {...state,isSignedIn:false,payload:action.payload}
        default:
            return state;
    }
}

export const store=createStore(combineReducers({auth:authReducer}))