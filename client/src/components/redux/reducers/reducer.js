import { combineReducers } from 'redux';
import userReducer from './userReducer';
import iframeReducer from './iframeReducer';
import modelReducer from './modelReducer';
const reducer = combineReducers({
  userReducer,
  iframeReducer,
  modelReducer,
});

export default reducer;
