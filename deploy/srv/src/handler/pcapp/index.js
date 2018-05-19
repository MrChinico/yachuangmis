const moment = require('moment');
const systemconfig = require('../common/systemconfig');
const userlogin = require('../common/userlogin');
const patientinfo = require('../common/patientinfo.js');
const depat = require('../common/depat.js');
const evaluatebarden = require('../common/evaluatebarden.js');
const evaluatenursingmeasures = require('../common/evaluatenursingmeasures.js');
const evaluatewoundsurface = require('../common/evaluatewoundsurface.js');
const formreviewlapseto = require('../common/formreviewlapseto.js');
const smartdevice = require('../common/smartdevice');
const debugapp = require('debug')('appsrv:app:index');

const actiondatahandler = {
  'getsystemconfig':systemconfig.getsystemconfig,
  'loginwithtoken':userlogin.loginwithtoken,
  'login':userlogin.loginuser,
};

const authhandler = {

  'logout':userlogin.logout,
  'getpatientinfo':patientinfo.getpatientinfo,
  'page_getpatientinfolist':patientinfo.page_getpatientinfolist,
  'getcount_reviewlapseto':formreviewlapseto.getcount_reviewlapseto,
  'createformreviewlapseto':formreviewlapseto.createformreviewlapseto,
  'editformreviewlapseto':formreviewlapseto.editformreviewlapseto,
  'page_getformreviewlapsetolist':formreviewlapseto.page_getformreviewlapsetolist,
  'editpatientinfo':patientinfo.editpatientinfo,
  'createevaluatebarden':evaluatebarden.createevaluatebarden,
  'editevaluatebarden':evaluatebarden.editevaluatebarden,
  'getevaluatebardenlist':evaluatebarden.getevaluatebardenlist,
  'createevaluatenursingmeasures':evaluatenursingmeasures.createevaluatenursingmeasures,
  'editevaluatenursingmeasures':evaluatenursingmeasures.editevaluatenursingmeasures,
  'getevaluatenursingmeasureslist':evaluatenursingmeasures.getevaluatenursingmeasureslist,
  'createevaluatewoundsurface':evaluatewoundsurface.createevaluatewoundsurface,
  'editevaluatewoundsurface':evaluatewoundsurface.editevaluatewoundsurface,
  'getevaluatewoundsurfacelist':evaluatewoundsurface.getevaluatewoundsurfacelist,
  'sendsmartdevicecmd':smartdevice.sendsmartdevicecmd,
  'subscribedevice':smartdevice.subscribedevice,
  'getdepatlist':depat.getdepatlist,
  'changepwd':userlogin.changepwd,
};

module.exports = (socket,actiondata,ctx)=>{
  debugapp(`${actiondata.cmd},actiondata:${JSON.stringify(actiondata.data)},ctx==>${JSON.stringify(ctx)}`);
  try{
      if(ctx.usertype !== 'pcapp'){
        debugapp("不是正确的客户端--->" + actiondata.cmd);
        socket.emit('common_err',{errmsg:'无效的app客户端'});
        return;
      }
      if(!!actiondatahandler[actiondata.cmd]){
        actiondatahandler[actiondata.cmd](actiondata.data,ctx,(result)=>{
          debugapp("服务端回复--->" + JSON.stringify(result));
          socket.emit(result.cmd,result.payload);
        });
      }
      else{
        if(!!authhandler[actiondata.cmd]){
          if(!ctx['userid']){
            debugapp("需要登录--->" + actiondata.cmd);
            socket.emit('common_err',{errmsg:'请先登录'});
          }
          else{
            authhandler[actiondata.cmd](actiondata.data,ctx,(result)=>{
              if(JSON.stringify(result).length < 10000){
                debugapp("服务端回复--->" + JSON.stringify(result));
              }
              socket.emit(result.cmd,result.payload);
            });
          }
        }
        else{
          debugapp("未找到处理函数--->" + actiondata.cmd);
          socket.emit('common_err',{errmsg:`未找到处理函数${actiondata.cmd}`});
        }
      }
    }
    catch(e){
      debugapp("服务端内部错误--->" + e);
      socket.emit('common_err',{errmsg:`服务端内部错误:${JSON.stringify(e)}`});
    }
}
