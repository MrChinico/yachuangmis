import { createReducer } from 'redux-act';
import {
  createevaluatewoundsurface_result,
  editevaluatewoundsurface_result,
  getevaluatewoundsurfacelist_result,
 } from '../actions';
import lodashmap from 'lodash.map';

const initial = {
    evaluatewoundsurface: {
        evaluatewoundsurfacelist:[],
        evaluatewoundsurfaces: {},
    },
};

const evaluatewoundsurface = createReducer({
  [createevaluatewoundsurface_result]:(state,payload)=>{
    let evaluatewoundsurfaces = {...state.evaluatewoundsurfaces};
    evaluatewoundsurfaces[payload._id] = payload;
    return { ...state, evaluatewoundsurfacelist:[...state.evaluatewoundsurfacelist,payload._id],evaluatewoundsurfaces };
  },
  [editevaluatewoundsurface_result]:(state,payload)=>{
     let evaluatewoundsurfaces = {...state.evaluatewoundsurfaces};
      evaluatewoundsurfaces[payload._id] = payload;
      return {...state,evaluatewoundsurfaces};
  },
  [getevaluatewoundsurfacelist_result]:(state,payload)=>{
      const {list} = payload;
      const evaluatewoundsurfacelist = [];
      const evaluatewoundsurfaces = {...state.evaluatewoundsurfaces};
      lodashmap(list,(info)=>{
        evaluatewoundsurfacelist.push(info._id);
        evaluatewoundsurfaces[info._id] = info;
      });
      return {...state, evaluatewoundsurfacelist,evaluatewoundsurfaces};
  },
}, initial.evaluatewoundsurface);

export default evaluatewoundsurface;
