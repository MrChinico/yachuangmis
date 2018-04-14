const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
// const coordtransform = require('coordtransform');
const _ = require('lodash');
const moment = require('moment');
const debug = require('debug')('appsrv:patientinfo');

exports.getpatientinfolist = (actiondata,ctx,callback)=>{
  const deviceModel = DBModels.PatientinfoModel;
  let query = actiondata.query || {};
  const fields = actiondata.fields || {};
  const permissionname = _.get(ctx,'permission.name','');
  if( permissionname === '普通护士' || permissionname === '护士长'){
     query.Depatno = ctx.Depatno;
  }

  const queryexec = deviceModel.find(query).select(fields).lean();
  queryexec.exec((err,list)=>{
    if(!err){
      callback({
        cmd:'getpatientinfolist_result',
        payload:{list}
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:err.message,type:'getpatientinfolist'}
      });
    }
  });

}
