const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
// const coordtransform = require('coordtransform');
const _ = require('lodash');
const moment = require('moment');
const debug = require('debug')('appsrv:patientinfo');

exports.createevaluatenursingmeasures = (actiondata,ctx,callback)=>{
  let entitydata = actiondata;
  entitydata.usercreatorid = ctx.userid;
  entitydata.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
  entitydata.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

  const dbModel = DBModels.EvaluateNursingmeasuresModel;
  const entity = new dbModel(entitydata);
  entity.save((err,newrecord)=>{
    if(!err && !!newrecord){
      callback({
        cmd:'createevaluatenursingmeasures_result',
        payload:newrecord
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:'新建护理措施失败',type:'createevaluatenursingmeasures'}
      });
    }
  });

}

exports.editevaluatenursingmeasures = (actiondata,ctx,callback)=>{
  const dbModel = DBModels.EvaluateNursingmeasuresModel;
  dbModel.findOneAndUpdate({_id: actiondata._id},{$set:actiondata},{new: true}).lean().exec((err, newrecord)=> {
      if(!err && !!newrecord){
        callback({
          cmd:'editevaluatenursingmeasures_result',
          payload:newrecord
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:'编辑护理措施失败',type:'editevaluatenursingmeasures'}
        });
      }
    });
}

exports.getevaluatenursingmeasureslist = (actiondata,ctx,callback)=>{

  const dbModel = DBModels.EvaluateNursingmeasuresModel;
  dbModel.find(actiondata.query).lean().exec((err,list)=>{
    if(!err && !!list){
      callback({
        cmd:'getevaluatenursingmeasureslist_result',
        payload:{list}
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:'获取护理措施失败',type:'getevaluatenursingmeasureslist'}
      });
    }
  });

}
