const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
// const coordtransform = require('coordtransform');
const _ = require('lodash');
const moment = require('moment');
const debug = require('debug')('appsrv:patientinfo');

exports.createformreviewlapseto = (actiondata,ctx,callback)=>{
  let entitydata = actiondata;
  entitydata.usercreatorid = ctx.userid;
  entitydata.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
  entitydata.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

  const dbModel = DBModels.FormReviewLapsetoModel;
  const entity = new dbModel(entitydata);
  entity.save((err,newrecord)=>{
    if(!err && !!newrecord){
      callback({
        cmd:'createformreviewlapseto_result',
        payload:newrecord
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:'新建转归申报失败',type:'createformreviewlapseto'}
      });
    }
  });

}

exports.editformreviewlapseto = (actiondata,ctx,callback)=>{
  const dbModel = DBModels.FormReviewLapsetoModel;
  dbModel.findOneAndUpdate({_id: actiondata._id},{$set:actiondata},{new: true}).lean().exec((err, newrecord)=> {
      if(!err && !!newrecord){
        callback({
          cmd:'editformreviewlapseto_result',
          payload:newrecord
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:'编辑转归申报失败失败',type:'editformreviewlapseto'}
        });
      }
    });
}
