import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import FireBaseReducer from "./FireBaseReducer";

export default combineReducers({
    auth: AuthReducer,
    fireBase: FireBaseReducer
});