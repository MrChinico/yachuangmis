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
  const descriptionstring = _.get(actiondata,'descriptionstring','');
  const buf  = getbuf.getbuf_control(deviceid,turnovermode,turnovertime);
  const userpatientid = _.get(actiondata,'userpatientid','');
  const smartdeviceid = _.get(actiondata,'smartdeviceid','');
  let sendstatus = '下发成功';
  const socket = tcpsrv.getsocketfromid(deviceid);
  if(!!socket){
    socket.write(buf);

    winston.getlog().info(`发送给硬件${deviceid}命令${turnovermode},${turnovertime},数据==>${buf.toString('hex')}`);
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
    sendstatus = `设备${deviceid}处于离线状态`;
    callback({
      cmd:'common_err',
      payload:{errmsg:`设备${deviceid}处于离线状态`,type:'sendsmartdevicecmd'}
    });
  }

  const SaveData = {
    userpatientid,
    usercreatorid:ctx.userid,
    smartdeviceid,
    created_at:moment().format('YYYY-MM-DD HH:mm:ss'),
    descriptionstring,
    cmdhex:buf.toString('hex'),
    sendstatus
  };
  const dbModel = DBModels.TurnoverHistoryModel;
  const entity = new dbModel(SaveData);
  entity.save((err,newrecord)=>{
  });

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
