const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
// const coordtransform = require('coordtransform');
const _ = require('lodash');
const moment = require('moment');
const debug = require('debug')('appsrv:patientinfo');

exports.createevaluatebarden = (actiondata,ctx,callback)=>{
  let entitydata = actiondata;
  entitydata.usercreatorid = ctx.userid;
  entitydata.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
  entitydata.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

  const dbModel = DBModels.EvaluateBardenModel;
  const entity = new dbModel(entitydata);
  entity.save((err,newrecord)=>{
    if(!err && !!newrecord){
      callback({
        cmd:'createevaluatebarden_result',
        payload:newrecord
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:'新建Barden评估失败',type:'createevaluatebarden'}
      });
    }
  });

}

exports.editevaluatebarden = (actiondata,ctx,callback)=>{
  const dbModel = DBModels.EvaluateBardenModel;
  dbModel.findOneAndUpdate({_id: actiondata._id},{$set:actiondata},{new: true}).lean().exec((err, newrecord)=> {
      if(!err && !!newrecord){
        callback({
          cmd:'editevaluatebarden_result',
          payload:newrecord
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:'编辑Barden评估失败',type:'editevaluatebarden'}
        });
      }
    });
}

exports.getevaluatebardenlist = (actiondata,ctx,callback)=>{
  const dbModel = DBModels.EvaluateBardenModel;
  dbModel.find(actiondata.query).lean().exec((err,list)=>{
    if(!err && !!list){
      callback({
        cmd:'editevaluatebarden_result',
        payload:{list}
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:'获取Barden评估失败',type:'getevaluatebardenlist'}
      });
    }
  });

}
