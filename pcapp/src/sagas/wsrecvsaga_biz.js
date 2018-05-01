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
  set_db,

  editpatientinfo_result,
  getpatientinfo_result,

  getevaluatebardenlist_result,
  getevaluatenursingmeasureslist_result,
  getevaluatewoundsurfacelist_result
} from '../actions';
import { goBack  } from 'react-router-redux';
// import lodashmap from 'lodash.map';
import {
  normalizr_paientinfo,
  normalizr_evaluatebarden,
  normalizr_evaluatewoundsurface,
  normalizr_evaluatenursingmeasures,
} from './normalizr';
import {
  page_getpatientinfolist_result
} from '../sagas/pagination';
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
      const {payload} = action;

      yield put(set_weui({
        toast:{
          text:popandreturn[i].title,
          show: true,
          type:'success'
      }}));

      //<----
      if(i === 0 || i === 1){//createevaluatebarden_result/editevaluatebarden_result
        const evaluatebardens = {_id:payload};
        yield put(set_db({evaluatebardens}));
      }
      if(i === 2 || i === 3){//createevaluatenursingmeasures_result/editevaluatenursingmeasures_result
        const evaluatenursingmeasuress = {_id:payload};
        yield put(set_db({evaluatenursingmeasuress}));
      }
      if(i === 4 || i === 5){//createevaluatewoundsurface_result/editevaluatewoundsurface_result
        const evaluatewoundsurfaces = {_id:payload};
        yield put(set_db({evaluatewoundsurfaces}));
      }

      if(i === 0 ||  i === 2 || i === 4){
        const paientinfo = yield select((state)=>{
          const {paientinfos} = state.db;
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


  yield takeLatest(`${page_getpatientinfolist_result}`,function*(action){
    const {payload} = action;
    const result = normalizr_paientinfo(payload.result);
    yield put(set_db(result));
  });

  yield takeLatest(`${editpatientinfo_result}`,function*(action){
    const {payload} = action;
    const paientinfos = {_id:payload};
    yield put(set_db({paientinfos}));
  });

  yield takeLatest(`${getpatientinfo_result}`,function*(action){
    const {payload} = action;
    const paientinfos = {_id:payload};
    yield put(set_db({paientinfos}));
  });

//-----------
  yield takeLatest(`${getevaluatebardenlist_result}`,function*(action){
    const {payload} = action;
    const result = normalizr_evaluatebarden(payload);
    yield put(set_db(result));
  });

  yield takeLatest(`${getevaluatenursingmeasureslist_result}`,function*(action){
    const {payload} = action;
    const result = normalizr_evaluatenursingmeasures(payload);
    yield put(set_db(result));
  });

  yield takeLatest(`${getevaluatewoundsurfacelist_result}`,function*(action){
    const {payload} = action;
    const result = normalizr_evaluatewoundsurface(payload);
    yield put(set_db(result));
  });

}
