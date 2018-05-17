const config = require('../config.js');
const DBModels = require('../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../log/log.js');
const _ = require('lodash');
const moment = require('moment');


const getdepatlistids = (ctx,callbackfn)=>{
  if(ctx.permission.name === '普通护士'){
    callbackfn([ctx.depatid._id]);
  }
  else if(ctx.permission.name === '护士长'){
    const depatModel = DBModels.DepatModel;
    depatModel.find({headnurseid:ctx.userid},{_id:1}).lean().exec((err,depatlist)=>{
        let depatlistids = [];
        if(!err && !!depatlist.length > 0){
          _.map(depatlist,(item)=>{
            depatlistids.push(item._id);
          });
          callbackfn(depatlistids);
          return;
        }
        //<------
        callbackfn([ctx.depatid]);
    });
  }
  else if(ctx.permission.name === '护理部主管'){
    const nursingDepatModel = DBModels.NursingDepatModel;
    nursingDepatModel.find({nursingdepatuserid:ctx.userid},{_id:1}).lean().exec((err,nursingDepatlist)=>{
      const depatModel = DBModels.depatModel;
      if(!err && nursingDepatlist.length > 0){
          let nursingdepatlistids = [];
          _.map(nursingdepatlistids,(item)=>{
            nursingdepatlistids.push(item._id);
          });
          const depatModel = DBModels.DepatModel;
          depatModel.find({nursingdepatid:{$in:nursingdepatlistids}},{_id:1}).lean().exec((err,depatlist)=>{
            let depatlistids = [];
            if(!err && !!depatlist.length > 0){
              _.map(depatlist,(item)=>{
                depatlistids.push(item._id);
              });
            }
            callbackfn(depatlistids);
          });
      }
    });
  }
  else{
    callbackfn([]);
  }

}

module.exports = getdepatlistids;
