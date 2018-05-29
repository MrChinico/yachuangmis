const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
const _ = require('lodash');
const async = require('async');
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
          payload:{errmsg:'编辑病人信息失败',type:'editpatientinfo'}
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
      },
      {
        path:'formreviewlapsetoid', model: 'formreviewlapseto',
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
          {
            path: 'signed_nursingdepartment',
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
    },
    {
      path:'formreviewlapsetoid', model: 'formreviewlapseto',
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
        {
          path: 'signed_nursingdepartment',
          model: 'user',
          select:'username truename Staffno Staffid Staffname Depatno',
        },
      ]
    }
  ];
  getdepatlistids(ctx,(depatlistids)=>{
    let querypre = actiondata.query;
    let query = {
      depatid:{$in:depatlistids}
    };
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
  });
}

exports.getstat =  (actiondata,ctx,callback)=>{

  const dbModel = DBModels.PatientinfoModel;
  getdepatlistids(ctx,(depatlistids)=>{
    let query = {
      depatid:{$in:depatlistids}
    };

    const fn_total = (callbackfn)=>{//所有
        dbModel.count(query,(err, list)=> {
            callbackfn(err,list);
        });
    };

    const fn_stat_occur1 = (callbackfn)=>{
      query[`Diseaseclassification`] = `院前压疮`;
      dbModel.count(query,(err, list)=> {
          callbackfn(err,list);
      });
    };

    const fn_stat_occur2 = (callbackfn)=>{
      query[`Diseaseclassification`] = `压疮高危`;
      dbModel.count(query,(err, list)=> {
          callbackfn(err,list);
      });
    };

    const fn_stat_cure = (callbackfn)=>{
      query[`stage`] = '已治愈';
      dbModel.count(query,(err, list)=> {
          callbackfn(err,list);
      });
    };



  let asyncfnsz = [fn_total,fn_stat_occur1,fn_stat_occur2,fn_stat_cure];
  async.parallel(asyncfnsz,(err,result)=>{
    if(!err){
      const count_total= result[0];
      const count_occur1 = result[1];
      const count_occur2 = result[2];
      const count_cure = result[3];
      callback({
        cmd:'getstat_result',
        payload:{count_total,count_occur1,count_occur2,count_cure}
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:`获取个数失败`,type:'getstat'}
      });
    }
  });

});

}
