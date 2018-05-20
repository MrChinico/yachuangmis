const config = require('../config.js');
const DBModels = require('../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../log/log.js');
const _ = require('lodash');
const moment = require('moment');
const debug = require('debug')('appsrv:getids');

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
      const depatModel = DBModels.DepatModel;
      if(!err && nursingDepatlist.length > 0){

          let nursingdepatlistids = [];
          _.map(nursingDepatlist,(item)=>{
            nursingdepatlistids.push(mongoose.Types.ObjectId(item._id));
          });

          debug(`nursingDepatlist==>${JSON.stringify(nursingdepatlistids)}`)

          depatModel.find({nursingdepatid:{$in:nursingdepatlistids}},{_id:1}).lean().exec((err,depatlist)=>{

            debug(`depatlist==>${JSON.stringify(depatlist)}`)
            let depatlistids = [];
            if(!err && !!depatlist.length > 0){
              _.map(depatlist,(item)=>{
                depatlistids.push(item._id);
              });
            }
            debug(`depatlistids==>${depatlistids.length}`)
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
