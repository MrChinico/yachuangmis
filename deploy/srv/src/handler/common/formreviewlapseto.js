const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
const _ = require('lodash');
const getdepatlistids = require('../getdepatlistids');
const moment = require('moment');
const debug = require('debug')('appsrv:patientinfo');

const getlapsetoquery = (ctx,depatid,callbackfn)=>{
  //如果是普通护士
  if(ctx.permission.name === '普通护士'){
    //只能看到自己新建的
    callbackfn({usercreatorid:ctx.userid});
  }
  else{
    //护士长 或 护理部主管
    getdepatlistids(ctx,(depatlistids)=>{
        if(!!depatid){
          depatlistids = [depatid];
        }
        const dbModel = DBModels.PatientinfoModel;
        dbModel.find({depatid:{$in:depatlistids}},{_id:1}).lean().exec((err,plist)=>{
          let patientlistids = [];
          if(!err && !!plist.length > 0){
            _.map(plist,(item)=>{
              patientlistids.push(item._id);
            });
          }
          callbackfn({userpatientid:{
            $in:patientlistids
          }});
        });
    });
  }
}

exports.createformreviewlapseto = (actiondata,ctx,callback)=>{
  let entitydata = actiondata.data;
  entitydata.usercreatorid = ctx.userid;
  entitydata.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
  entitydata.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

  const dbModel = DBModels.FormReviewLapsetoModel;
  const entity = new dbModel(entitydata);
  entity.save((err,newrecord)=>{
    if(!err && !!newrecord){
      callback({
        cmd:'createformreviewlapseto_result',
        payload:{
          isid2:actiondata.isid2,
          data:newrecord
        }
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
  dbModel.findOneAndUpdate({_id: actiondata._id},{$set:actiondata.data},{new: true}).lean().exec((err, newrecord)=> {
      if(!err && !!newrecord){
        callback({
          cmd:'editformreviewlapseto_result',
          payload:{
            isid2:actiondata.isid2,
            data:newrecord
          }
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

exports.getcount_reviewlapseto = (actiondata,ctx,callback)=>{
  const dbModel = DBModels.FormReviewLapsetoModel;
  getlapsetoquery(ctx,undefined,(query)=>{
    dbModel.count(query,(err,number)=>{
        if(!err){
          callback({
            cmd:'getcount_reviewlapseto_result',
            payload:{number}
          });
        }
        else{
          callback({
            cmd:'common_err',
            payload:{errmsg:err.message,type:'getcount_reviewlapseto_result'}
          });
        }
    });
  });
}

exports.page_getformreviewlapsetolist =  (actiondata,ctx,callback)=>{
  const dbModel = DBModels.FormReviewLapsetoModel;
  actiondata.options = actiondata.options || {};
  actiondata.options.lean = true;
  actiondata.options.populate = [
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
  ];
  const depatid = _.get(actiondata,'query.depatid');
  getlapsetoquery(ctx,depatid,(query)=>{
    let querypre = actiondata.query;
    _.map(querypre,(value,key)=>{
      if(key !== 'depatid'){
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
          cmd:'page_getformreviewlapsetolist_result',
          payload:{result}
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:err.message,type:'page_getformreviewlapsetolist_result'}
        });
      }
    });
  });
}
