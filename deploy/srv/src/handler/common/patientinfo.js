const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
// const coordtransform = require('coordtransform');
const _ = require('lodash');
const moment = require('moment');
const debug = require('debug')('appsrv:patientinfo');
const getdepatlistids = require('../getdepatlistids');

exports.editpatientinfo = (actiondata,ctx,callback)=>{
  const dbModel = DBModels.PatientinfoModel;
  dbModel.findOneAndUpdate({_id: actiondata._id},{$set:actiondata},{new: true}).lean().exec((err, newrecord)=> {
      if(!err && !!newrecord){
        callback({
          cmd:'editpatientinfo_result',
          payload:newrecord
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:'编辑护理措施失败',type:'editpatientinfo'}
        });
      }
  });
}

exports.getpatientinfo = (actiondata,ctx,callback)=>{
  const dbModel = DBModels.PatientinfoModel;
  dbModel.findOne({_id: actiondata._id})
    .populate([
      {
        path:'bedid', model: 'bed',
        populate: [
          {
            path: 'smartdeviceid',
            model: 'smartdevice'
          }
        ]
      },
      {
        path:'depatid',model:'depat'
      },
      {
        path:'firstevaluatebardenid', model: 'evaluatebarden',
        populate: [
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
        ]
      },
      {
        path:'firstevaluatewoundsurfaceid', model: 'evaluatewoundsurface',
        populate: [
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
        ]
      },
      {
        path:'firstevaluatenursingmeasuresid', model: 'evaluatenursingmeasures',
        populate: [
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
        ]
      }
    ]).lean().exec((err, newrecord)=> {
      if(!err && !!newrecord){
        callback({
          cmd:'getpatientinfo_result',
          payload:newrecord
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:'获取病人详情失败',type:'getpatientinfo'}
        });
      }
   });
}

exports.page_getpatientinfolist =  (actiondata,ctx,callback)=>{
  const dbModel = DBModels.PatientinfoModel;
  actiondata.options = actiondata.options || {};
  actiondata.options.lean = true;
  actiondata.options.populate = [
    {
      path:'bedid', model: 'bed',
      populate: [
        {
          path: 'smartdeviceid',
          model: 'smartdevice'
        }
      ]
    },
    {
      path:'depatid',model:'depat'
    },
    {
      path:'firstevaluatebardenid', model: 'evaluatebarden',
      populate: [
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
      ]
    },
    {
      path:'firstevaluatewoundsurfaceid', model: 'evaluatewoundsurface',
      populate: [
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
      ]
    },
    {
      path:'firstevaluatenursingmeasuresid', model: 'evaluatenursingmeasures',
      populate: [
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
      ]
    }
  ];
  // getdepatlistids(ctx,(depatlistids)=>{
    let querypre = actiondata.query;
    let query = {};
    _.map(querypre,(value,key)=>{
      let keysz = key.split('_');
      if(keysz.length === 2){
        if(keysz[1]=== 'q'){
          query[keysz[0]] = new RegExp(value,'ig');
        }
      }
      else{
        query[key] = value;
      }
    });
    debug(`搜索条件:${JSON.stringify(query)}`);
    dbModel.paginate(query,actiondata.options,(err,result)=>{
      if(!err){
        let docs = [];
        _.map(result.docs,(record)=>{
          docs.push(record);
        });

        callback({
          cmd:'page_getpatientinfolist_result',
          payload:{result}
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:err.message,type:'page_getpatientinfolist_result'}
        });
      }
    });
  // });
}
