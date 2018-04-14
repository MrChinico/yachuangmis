const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
const _ = require('lodash');
const moment = require('moment');

exports.getdepatlist = (actiondata,ctx,callback)=>{
  const depatModel = DBModels.DepatModel;
  const queryexec = depatModel.find({isenabled:true}).select().lean();
  queryexec.exec((err,list)=>{
    if(!err && !!list){
        callback({
          cmd:'getdepatlist_result',
          payload:{list}
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:err.message,type:'getdepatlist'}
        });
      }
  });
};
