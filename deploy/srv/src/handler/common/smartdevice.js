const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
// const coordtransform = require('coordtransform');
const _ = require('lodash');
const moment = require('moment');
const debug = require('debug')('appsrv:smartdevice');

exports.sendsmartdevicecmd = (actiondata,ctx,callback)=>{
  debug(`actiondata===>${JSON.stringify(actiondata)}`);
  callback({
    cmd:'sendsmartdevicecmd_result',
    payload:{
        deviceid:_.get(actiondata,'deviceid',''),
        turnovermode:_.get(actiondata,'cmd.turnovermode',''),
        turnovertime:_.get(actiondata,'cmd.turnovertime',''),
    }
  });
}
