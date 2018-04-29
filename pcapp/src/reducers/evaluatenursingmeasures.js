import { createReducer } from 'redux-act';
import {
  createevaluatenursingmeasures_result,
  editevaluatenursingmeasures_result,
  getevaluatenursingmeasureslist_result,
 } from '../actions';
import lodashmap from 'lodash.map';

const initial = {
    evaluatenursingmeasures: {
        evaluatenursingmeasureslist:[],
        evaluatenursingmeasuress: {},
    },
};

const evaluatenursingmeasures = createReducer({
  [createevaluatenursingmeasures_result]:(state,payload)=>{
    let evaluatenursingmeasuress = {...state.evaluatenursingmeasuress};
    evaluatenursingmeasuress[payload._id] = payload;
    return { ...state, evaluatenursingmeasureslist:[...state.evaluatenursingmeasureslist,payload._id],evaluatenursingmeasuress };
  },
  [editevaluatenursingmeasures_result]:(state,payload)=>{
     let evaluatenursingmeasuress = {...state.evaluatenursingmeasuress};
      evaluatenursingmeasuress[payload._id] = payload;
      return {...state,evaluatenursingmeasuress};
  },
  [getevaluatenursingmeasureslist_result]:(state,payload)=>{
      const {list} = payload;
      const evaluatenursingmeasureslist = [];
      const evaluatenursingmeasuress = {...state.evaluatenursingmeasuress};
      lodashmap(list,(info)=>{
        evaluatenursingmeasureslist.push(info._id);
        evaluatenursingmeasuress[info._id] = info;
      });
      return {...state, evaluatenursingmeasureslist,evaluatenursingmeasuress};
  },
}, initial.evaluatenursingmeasures);

export default evaluatenursingmeasures;
