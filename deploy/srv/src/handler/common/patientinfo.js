const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
// const coordtransform = require('coordtransform');
const _ = require('lodash');
const moment = require('moment');
const debug = require('debug')('appsrv:patientinfo');
const getdepatlistids = require('../getdepatlistids');

exports.getpatientinfolist = (actiondata,ctx,callback)=>{

  const dbModel = DBModels.PatientinfoModel;

  actiondata.options = actiondata.options || {};
  actiondata.options.lean = true;
  payloadata.options.populate = [
    {
      path:'bedid', model: 'bed'
    },
    {
      path:'depatid',model:'depat'
    }
  ];
  getdepatlistids(ctx,(depatlistids)=>{
    const query = {depatid:{$in:depatlistids}};
    dbModel.paginate(query,actiondata.options,(err,result)=>{
      if(!err){
        let docs = [];
        _.map(result.docs,(record)=>{
          docs.push(record);
        });

        callback({
          cmd:'getpatientinfolist_result',
          payload:{result}
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:err.message,type:'getpatientinfolist_result'}
        });
      }
    });
  });

  // let query = actiondata.query || {};
  // const fields = actiondata.fields || {};
  // const permissionname = _.get(ctx,'permission.name','');
  // if( permissionname === '普通护士' || permissionname === '护士长'){
  //    query.Depatno = ctx.Depatno;
  // }
  //
  // const queryexec = deviceModel.find(query).select(fields).lean();
  // queryexec.exec((err,list)=>{
  //   if(!err){
  //     callback({
  //       cmd:'getpatientinfolist_result',
  //       payload:{list}
  //     });
  //   }
  //   else{
  //     callback({
  //       cmd:'common_err',
  //       payload:{errmsg:err.message,type:'getpatientinfolist'}
  //     });
  //   }
  // });

}
