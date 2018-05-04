const moment = require('moment');
const DBModels = require('../db/models');
const PubSub = require('pubsub-js');
const debug = require('debug')('appsrv:data')
//
// 设备状态
// 1字节
// 0x30:设备初始态 0x31:设备运行态 0x32:设备停止态
// 气垫方位
// 1字节
// ‘L’(0x4C):左侧 ‘R’(0x52):右侧 ‘T’(0x54):平躺
// 气垫角度
// 1字节
// 0x30: 平躺 0x1E:30度 0x2D:45度 0x3C:60度
// 当前姿态建立状态
// 1字节
// 0x30:姿态建立中 0x31:姿态建立完成并保持

const setdata_devicestatus = (deviceid,bodybuf)=>{
  const status = bodybuf[0];
  const position = bodybuf[1];
  const angle = bodybuf[2];
  const establishstatus = bodybuf[3];

  let statusstring = '未知状态';
  if(status === 0x30){
    statusstring = '设备初始态';
  }
  else if(status === 0x31){
    statusstring = '设备运行态';
  }
  else if(status === 0x32){
    statusstring = '设备停止态';
  }

  let positionstring = '';
  if(position === 0x4C){
    positionstring = '左侧';
  }
  else if(position === 0x52){
    positionstring = '右侧';
  }
  else if(position === 0x54){
    positionstring = '平躺';
  }

  let anglestring = '';
  if(angle === 0x30){
    anglestring = '平躺';
  }
  else if(angle === 0x1E){
    anglestring = '30度';
  }
  else if(angle === 0x2D){
    anglestring = '45度';
  }
  else if(angle === 0x3C){
    anglestring = '60度';
  }

  let establishstatusstring = '';
  if(status === 0x30){
    establishstatusstring = '姿态建立中';
  }
  else if(status === 0x31){
    establishstatusstring = '姿态建立完成并保持';
  }

  const realtimedata = {
    status,
    statusstring,
    position,
    positionstring,
    angle,
    anglestring,
    establishstatus,
    establishstatusstring,
    lastupdatetime:moment().format('YYYY-MM-DD HH:mm:ss')
  };

  debug(`getdata-->${deviceid}--->${JSON.stringify(realtimedata)}`);

  const smartDeviceModel = DBModels.SmartDeviceModel;
  smartDeviceModel.findOneAndUpdate({deviceid},{
    $set:{realtimedata}
  }, {new: true,upsert:true}).lean().exec(
    (err, smartdevice)=> {
      debug(err);
      debug(smartdevice);
      if(!err && !!smartdevice){
        PubSub.publish(`smartdevice.${smartdevice._id}`,smartdevice);
      }
  });
}


exports.setdata_devicestatus =  setdata_devicestatus;
