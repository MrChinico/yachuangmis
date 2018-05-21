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


const HistoryDeviceEdit = (props) => {
  return (<Edit title="智能设备"  {...props} >
    <SimpleForm>
      <ReferenceField label="智能设备" source="smartdeviceid" reference="smartdevice" allowEmpty>
        <TextField source="deviceid" />
      </ReferenceField>
      <DeviceData label="设备状态" source="statusstring" addLabel={true}/>
      <DeviceData label="气垫方位" source="positionstring"  addLabel={true}/>
      <DeviceData label="气垫角度" source="anglestring"  addLabel={true}/>
      <DeviceData label="姿态建立状态" source="establishstatusstring"  addLabel={true}/>
      <TextField label="更新时间" source="created_at"  />
    </SimpleForm>
  </Edit>
  );
};

const HistoryDeviceFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="智能设备" source="smartdeviceid" reference="smartdevice" allowEmpty>
      <SelectInput optionText="deviceid" />
    </ReferenceInput>
  </Filter>
)

const HistoryDeviceList = (props) => (
  <List title="智能设备" filters={<HistoryDeviceFilter />} {...props} sort={{field:'created_at',order:'DESC'}}>
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <ReferenceField label="智能设备" source="smartdeviceid" reference="smartdevice" allowEmpty>
        <TextField source="deviceid" />
      </ReferenceField>
      <DeviceData label="设备状态" source="statusstring" addLabel={true}/>
      <DeviceData label="气垫方位" source="positionstring"  addLabel={true}/>
      <DeviceData label="气垫角度" source="anglestring"  addLabel={true}/>
      <DeviceData label="姿态建立状态" source="establishstatusstring"  addLabel={true}/>
      <TextField label="更新时间" source="created_at"  />
      <EditButton />
    </Datagrid>
  </List>
);

export {HistoryDeviceList,HistoryDeviceEdit};
