import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import app from './app';
import userlogin from './userlogin';
import paientinfo from './paientinfo';
import evaluatebarden from './evaluatebarden';
import evaluatenursingmeasures from './evaluatenursingmeasures';
import evaluatewoundsurface from './evaluatewoundsurface';

export default combineReducers({
  	app,
  	userlogin,
    paientinfo,
    evaluatebarden,
    evaluatenursingmeasures,
    evaluatewoundsurface,
  	form: formReducer,
  	router: routerReducer,
});
