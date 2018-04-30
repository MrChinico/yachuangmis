import { put,takeLatest,select} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
import {
  editpatientinfo_request,

  createevaluatebarden_result,
  editevaluatebarden_result,
  createevaluatenursingmeasures_result,
  editevaluatenursingmeasures_result,
  createevaluatewoundsurface_result,
  editevaluatewoundsurface_result,
  set_weui,

} from '../actions';
import { goBack  } from 'react-router-redux';
// import config from '../env/config.js';
const popandreturn = [
  {
    req:`${createevaluatebarden_result}`,
    title:`新建Barden评估成功`
  },
  {
    req:`${editevaluatebarden_result}`,
    title:`编辑Barden评估成功`
  },
  {
    req:`${createevaluatenursingmeasures_result}`,
    title:`新建护理措施成功`
  },
  {
    req:`${editevaluatenursingmeasures_result}`,
    title:`编辑护理措施成功`
  },
  {
    req:`${createevaluatewoundsurface_result}`,
    title:`新建创面评估成功`
  },
  {
    req:`${editevaluatewoundsurface_result}`,
    title:`编辑创面评估成功`
  },

]

export function* wsrecvsagabizflow() {

  for(let i = 0 ;i < popandreturn.length ; i++){
    yield takeLatest(popandreturn[i].req, function*(action) {
      yield put(set_weui({
        toast:{
          text:popandreturn[i].title,
          show: true,
          type:'success'
      }}));

      if(i === 0 ||  i === 2 || i === 4){
        const {payload} = action;
        const paientinfo = yield select((state)=>{
          const {paientinfos} = state.paientinfo;
          return paientinfos[payload.userpatientid];
        });
        if(!!paientinfo){
          if(i === 0 && !paientinfo.firstevaluatebardenid){
            yield put(editpatientinfo_request({
              _id:paientinfo._id,
              firstevaluatebardenid:payload._id
            }));
          }
          if(i === 2 && !paientinfo.firstevaluatenursingmeasuresid){
            yield put(editpatientinfo_request({
              _id:paientinfo._id,
              firstevaluatenursingmeasuresid:payload._id
            }));
          }
          if(i === 4 && !paientinfo.firstevaluatewoundsurfaceid){
            yield put(editpatientinfo_request({
              _id:paientinfo._id,
              firstevaluatewoundsurfaceid:payload._id
            }));
          }
        }
      }
      yield put(goBack());
    });
  }





}
