import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { NumberInput,
  NumberField,
  Edit,
  Show,
  SimpleForm,
  DisabledInput,
  TextInput,
  SimpleShowLayout,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  BooleanInput,
  TabbedForm,
  FormTab,
  Filter,
  SelectInput,
  SelectField,
  ImageField,
  ReferenceInput,
  ReferenceField } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import _ from 'lodash';
import {ShowActions} from '../controls/createeditactions';
import ShowButton from '../controls/ShowButton';

const getstring_status = (status)=>{
  let showstring = '';
  if(status === 0){
    showstring+= '设备初始态';
  }
  else if(status === 1){
    showstring+= '设备运行态';
  }
  else{
    showstring+= '设备停止态';
  }
  return showstring;
}

const getstring_position = (position)=>{
  let showstring = '';
  if(position === 'L'){
    showstring+= '左侧';
  }
  else if(position === 'R'){
    showstring+= '右侧';
  }
  else if(position === 'T'){
    showstring+= '平躺';
  }
  return showstring;
}

const getstring_angle = (angle)=>{
  let showstring = '';
  if(angle === 0){
    showstring += `平躺`;
  }
  else{
    showstring += `${angle}度`;
  }
  return showstring;
}

const getstring_establishstatus = (establishstatus)=>{
  let showstring = '';
  if(establishstatus === 0){
    showstring += `姿态建立中`;
  }
  else{
    showstring += `姿态建立完成并保持`;
  }
  return showstring;
}


const DeviceData = (props)=>{
  const { record,source } = props;

  const showstring = _.get(record,source);
  // let showstring = '';
  // if(source === 'realtimedata.status'){
  //   showstring = getstring_status(value);
  // }
  // else if(source === 'realtimedata.position'){
  //   showstring = getstring_position(value);
  // }
  // else if(source === 'realtimedata.angle'){
  //   showstring = getstring_angle(value);
  // }
  // else if(source === 'realtimedata.establishstatus'){
  //   showstring = getstring_establishstatus(value);
  // }
  return (<span>{showstring}</span>);
}


const SmartdeviceEdit = (props) => {
  return (<Edit title="智能设备"  {...props} >
    <SimpleForm>
      <TextField label="设备编号" source="deviceid"  />
      <DeviceData label="设备状态" source="realtimedata.statusstring" addLabel={true}/>
      <DeviceData label="气垫方位" source="realtimedata.positionstring"  addLabel={true}/>
      <DeviceData label="气垫角度" source="realtimedata.anglestring"  addLabel={true}/>
      <DeviceData label="姿态建立状态" source="realtimedata.establishstatusstring"  addLabel={true}/>
      <TextField label="最后更新时间" source="realtimedata.lastupdatetime"  />
    </SimpleForm>
  </Edit>
  );
};

const SmartdeviceFilter = (props) => (
  <Filter {...props}>
    <TextInput label="设备编号" source="deviceid" />
  </Filter>
)

const SmartdeviceList = (props) => (
  <List title="智能设备" filters={<SmartdeviceFilter />} {...props} sort={{field:'Smartdeviceno',order:'DESC'}}>
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <TextField label="设备编号" source="deviceid"  />
      <DeviceData label="设备状态" source="realtimedata.statusstring" />
      <DeviceData label="气垫方位" source="realtimedata.positionstring" />
      <DeviceData label="气垫角度" source="realtimedata.anglestring" />
      <DeviceData label="姿态建立状态" source="realtimedata.establishstatusstring" />
      <TextField label="最后更新时间" source="realtimedata.lastupdatetime"  />
      <EditButton />
    </Datagrid>
  </List>
);

export {SmartdeviceList,SmartdeviceEdit};
