import { put,takeLatest} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
import {
  common_err,

  md_login_result,
  login_result,

  set_weui,

  getpatientinfo_request,

  changepwd_result,
  set_uiapp,

  logout_result
} from '../actions';

import config from '../env/config.js';


export function* wsrecvsagaflow() {

  yield takeLatest(`${changepwd_result}`, function*(action) {
    yield put(set_uiapp({ ispoppwd: false }));
    yield put(set_weui({
      toast:{
        text:'修改新密码成功',
        show: true,
        type:'success'
    }}));
  });


  yield takeLatest(`${md_login_result}`, function*(action) {
      try{
      let {payload:result} = action;
        //console.log(`md_login_result==>${JSON.stringify(result)}`);
        if(!!result){
            yield put(login_result(result));
            if(result.loginsuccess){
              localStorage.setItem(`yc_${config.softmode}_token`,result.token);

              yield put(getpatientinfo_request({}));

            }
        }

      }
      catch(e){
        console.log(e);
      }

  });


  yield takeLatest(`${common_err}`, function*(action) {
      let {payload:result} = action;

      yield put(set_weui({
        toast:{
          text:result.errmsg,
          show: true,
          type:'warning'
      }}));
  });



  yield takeLatest(`${logout_result}`, function*(action) {

  });


}
