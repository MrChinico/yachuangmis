const config = require('../config.js');
const DBModels = require('../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../log/log.js');
const _ = require('lodash');
const moment = require('moment');


const getdepatlistids = (ctx,callbackfn)=>{
  const nursingDepatModel = DBModels.NursingDepatModel;
  nursingDepatModel.find({nursingdepatuserid:ctx.userid},{_id:1}).lean().exec((err,nursingDepatlist)=>{
    const depatModel = DBModels.depatModel;
    if(!err && nursingDepatlist.length > 0){
        let nursingdepatlistids = [];
        _.map(nursingdepatlistids,(item)=>{
          nursingdepatlistids.push(item._id);
        });
        depatModel.find({nursingdepatid:{$in:nursingdepatlistids}},{_id:1}).lean().exec((err,depatlist)=>{
          let depatlistids = [];
          if(!err && !!depatlist.length > 0){
            _.map(depatlist,(item)=>{
              depatlistids.push(item._id);
            });
          }
          callbackfn(depatlistids);
        });
        return;
    }
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
  });
}

module.exports = getdepatlistids;
