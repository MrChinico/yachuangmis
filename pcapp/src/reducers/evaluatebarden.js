import { createReducer } from 'redux-act';
import {
  createevaluatebarden_result,
  editevaluatebarden_result,
  getevaluatebardenlist_result,
 } from '../actions';
import lodashmap from 'lodash.map';

const initial = {
    evaluatebarden: {
        evaluatebardenlist:[],
        evaluatebardens: {},
    },
};

const evaluatebarden = createReducer({
  [createevaluatebarden_result]:(state,payload)=>{
    let evaluatebardens = {...state.evaluatebardens};
    evaluatebardens[payload._id] = payload;
    return { ...state, evaluatebardenlist:[...state.evaluatebardenlist,payload._id],evaluatebardens };
  },
  [editevaluatebarden_result]:(state,payload)=>{
     let evaluatebardens = {...state.evaluatebardens};
      evaluatebardens[payload._id] = payload;
      return {...state,evaluatebardens};
  },
  [getevaluatebardenlist_result]:(state,payload)=>{
      const {list} = payload;
      const evaluatebardenlist = [];
      const evaluatebardens = {...state.evaluatebardens};
      lodashmap(list,(info)=>{
        evaluatebardenlist.push(info._id);
        evaluatebardens[info._id] = info;
      });
      return {...state, evaluatebardenlist,evaluatebardens};
  },
}, initial.evaluatebarden);

export default evaluatebarden;
