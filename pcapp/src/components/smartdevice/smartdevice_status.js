import React from 'react';
import lodashget from 'lodash.get';

const SmartDeviceStatus = (props)=>{
  const {cursmartdevice} = props;
  console.log(cursmartdevice);
  return (
    <div className="device-info">
    <span className="device-name">智能床ID:{lodashget(cursmartdevice,'deviceid','')}</span>
    <span>设备状态：<font>{lodashget(cursmartdevice,'realtimedata.establishstatus','')}</font></span>
    <span>气垫方位：<font>{lodashget(cursmartdevice,'realtimedata.positionstring','')}</font></span>
    <span>气垫角度：<font>{lodashget(cursmartdevice,'realtimedata.anglestring','')}</font></span>
    <span>当前姿态建立状态：<font>{lodashget(cursmartdevice,'realtimedata.establishstatusstring','')}</font></span>
    <span>最后上报时间：<font className="warn-color">{lodashget(cursmartdevice,'realtimedata.lastupdatetime','')}</font></span>
  </div>);
}

export default SmartDeviceStatus;
