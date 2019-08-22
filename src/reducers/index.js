import { combineReducers } from 'redux';
// import authReducer from './authReducer';
// import errorReducer from './errorReducer';
import locationReducer from './locationReducer'

export default combineReducers({
//   auth: authReducer,
//   error: errorReducer,
  location: locationReducer
})