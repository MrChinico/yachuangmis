const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
const _ = require('lodash');
const moment = require('moment');
const tcpsrv = require('../../tcpsrv');
const getbuf = require('../../tcpsrv/getbuf');
const debug = require('debug')('appsrv:smartdevice');
const PubSub = require('pubsub-js');

exports.sendsmartdevicecmd = (actiondata,ctx,callback)=>{
  debug(`actiondata===>${JSON.stringify(actiondata)}`);
  const deviceid = _.get(actiondata,'deviceid','');
  const turnovermode = _.get(actiondata,'cmd.turnovermode','');
  const turnovertime = _.get(actiondata,'cmd.turnovertime','');
  const socket = tcpsrv.getsocketfromid(deviceid);
  if(!!socket){
    const buf  = getbuf.getbuf_control(turnovermode,turnovertime);
    socket.write(buf);
    //<--------
    callback({
      cmd:'sendsmartdevicecmd_result',
      payload:{
          deviceid,
          turnovermode,
          turnovertime,
      }
    });
  }
  else{
    callback({
      cmd:'common_err',
      payload:{errmsg:`设备${deviceid}处于离线状态`,type:'sendsmartdevicecmd'}
    });
  }

}

exports.subscribedevice = (actiondata,ctx,callback)=>{
  const {smartdeviceid,subscribeflag} = actiondata;

  if(subscribeflag){
    PubSub.subscribe(`smartdevice.${smartdeviceid}`,ctx.userDeviceSubscriber);
  }
  else{
    PubSub.unsubscribe( ctx.userDeviceSubscriber );
  }


  callback({
    cmd:'subscribedevice_result',
    payload:{
        smartdeviceid,
        subscribeflag,
    }
  });
}
