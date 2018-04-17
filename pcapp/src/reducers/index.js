import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import app from './app';
import userlogin from './userlogin';
import paientinfo from './paientinfo';

export default combineReducers({
  	app,
  	userlogin,
    paientinfo,
  	form: formReducer,
  	router: routerReducer,
});
