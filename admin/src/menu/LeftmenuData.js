import React  from 'react';
import PropTypes from 'prop-types';
import { translate } from 'admin-on-rest';

import SystemconfigIcon from 'material-ui/svg-icons/action/settings-brightness';//系统设置
import DeviceIcon from 'material-ui/svg-icons/device/devices';//节点
import DeviceGroupIcon from 'material-ui/svg-icons/action/list';//节点分组
import UserIcon from 'material-ui/svg-icons/action/account-circle';//用户
import ProductIcon from 'material-ui/svg-icons/action/dns';//产品
import OnlineResearchIcon from 'material-ui/svg-icons/social/poll';//在线调查
import PermissionIcon from 'material-ui/svg-icons/action/fingerprint';//权限
import RoleIcon from 'material-ui/svg-icons/action/account-box';//角色
import RealtimeAlarmRawIcon from 'material-ui/svg-icons/action/alarm';//报警
import HistoryDeviceIcon from 'material-ui/svg-icons/action/history';//历史节点数据

// ic_history

export default [
        { name: 'systemconfig', icon: <SystemconfigIcon /> ,adminonly:false},
        { name: 'patientinfo', icon: <ProductIcon /> ,adminonly:false},
        { name: 'nursingdepat', icon: <ProductIcon /> ,adminonly:false},
        { name: 'depat', icon: <OnlineResearchIcon /> ,adminonly:false},
        { name: 'bed', icon: <DeviceIcon />,adminonly:false },
        { name: 'smartdevice', icon: <OnlineResearchIcon /> ,adminonly:false},
        { name: 'user', icon: <UserIcon /> ,adminonly:false},
        { name: 'permission', icon: <PermissionIcon /> ,adminonly:false},
        { name: 'evaluatebarden', icon: <OnlineResearchIcon /> ,adminonly:false},
        { name: 'evaluatenursingmeasures', icon: <OnlineResearchIcon /> ,adminonly:false},
        { name: 'evaluatewoundsurface', icon: <OnlineResearchIcon /> ,adminonly:false},
        { name: 'formreivewlapseto', icon: <OnlineResearchIcon /> ,adminonly:false},
        { name: 'turnoverhistory', icon: <OnlineResearchIcon /> ,adminonly:false},
        { name: 'historydevice', icon: <OnlineResearchIcon /> ,adminonly:false},
];
