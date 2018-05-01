const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
// const coordtransform = require('coordtransform');
const _ = require('lodash');
const moment = require('moment');
const debug = require('debug')('appsrv:patientinfo');



exports.createevaluatewoundsurface = (actiondata,ctx,callback)=>{
  let entitydata = actiondata;
  entitydata.usercreatorid = ctx.userid;
  entitydata.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
  entitydata.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

  const dbModel = DBModels.EvaluateWoundsurfaceModel;
  const entity = new dbModel(entitydata);
  entity.save((err,newrecord)=>{
    if(!err && !!newrecord){
      callback({
        cmd:'createevaluatewoundsurface_result',
        payload:newrecord
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:'新建创面评估失败',type:'createevaluatewoundsurface'}
      });
    }
  });

}

exports.editevaluatewoundsurface = (actiondata,ctx,callback)=>{
  const dbModel = DBModels.EvaluateWoundsurfaceModel;
  dbModel.findOneAndUpdate({_id: actiondata._id},{$set:actiondata},{new: true}).lean().exec((err, newrecord)=> {
      if(!err && !!newrecord){
        callback({
          cmd:'editevaluatewoundsurface_result',
          payload:newrecord
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:'编辑创面评估失败',type:'editevaluatewoundsurface'}
        });
      }
    });
}

exports.getevaluatewoundsurfacelist = (actiondata,ctx,callback)=>{

  const dbModel = DBModels.EvaluateWoundsurfaceModel;
  dbModel.find(actiondata.query).populate([
    {
      path: 'usercreatorid',
      model: 'user',
      select:'username truename Staffno Staffid Staffname Depatno',
    },
    {
      path: 'signed_nurse',
      model: 'user',
      select:'username truename Staffno Staffid Staffname Depatno',
    },
    {
      path: 'signed_headnurse',
      model: 'user',
      select:'username truename Staffno Staffid Staffname Depatno',
    },
  ]).lean().exec((err,list)=>{
    if(!err && !!list){
      callback({
        cmd:'getevaluatewoundsurfacelist_result',
        payload:{list}
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:'获取创面评估失败',type:'getevaluatewoundsurfacelist'}
      });
    }
  });

}
