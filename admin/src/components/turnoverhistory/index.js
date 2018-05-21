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


const TurnoverhistoryEdit = (props) => {
  return (<Edit title="翻身记录"  {...props} >
    <SimpleForm>
      <TextField label="翻身描述" source="descriptionstring"  />
      <TextField source="created_at" label="翻身时间" />
      <TextField source="sendstatus" label="发送状态" />
      <TextField source="cmdhex" label="设备命令" />
      <ReferenceField label="护士" source="usercreatorid" reference="user" allowEmpty>
        <TextField source="Staffname" />
      </ReferenceField>
      <ReferenceField label="智能设备" source="smartdeviceid" reference="smartdevice" allowEmpty>
        <TextField source="deviceid" />
      </ReferenceField>
      <ReferenceField label="病人" source="userpatientid" reference="patientinfo" allowEmpty>
        <TextField source="Patientname" />
      </ReferenceField>
    </SimpleForm>
  </Edit>
  );
};

const TurnoverhistoryFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="护士" source="usercreatorid" reference="user" allowEmpty>
      <SelectInput optionText="Staffname" />
    </ReferenceInput>
    <ReferenceInput label="智能设备" source="smartdeviceid" reference="smartdevice" allowEmpty>
      <SelectInput optionText="deviceid" />
    </ReferenceInput>
    <ReferenceInput label="病人" source="userpatientid" reference="patientinfo" allowEmpty>
      <SelectInput optionText="Patientname" />
    </ReferenceInput>
  </Filter>
)

const TurnoverhistoryList = (props) => (
  <List title="翻身记录" filters={<TurnoverhistoryFilter />} {...props} sort={{field:'created_at',order:'DESC'}}>
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <TextField label="翻身描述" source="descriptionstring"  />
      <TextField source="created_at" label="翻身时间" />
      <TextField source="sendstatus" label="发送状态" />
      <ReferenceField label="护士" source="usercreatorid" reference="user" allowEmpty>
        <TextField source="Staffname" />
      </ReferenceField>
      <ReferenceField label="智能设备" source="smartdeviceid" reference="smartdevice" allowEmpty>
        <TextField source="deviceid" />
      </ReferenceField>
      <ReferenceField label="病人" source="userpatientid" reference="patientinfo" allowEmpty>
        <TextField source="Patientname" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export {TurnoverhistoryList,TurnoverhistoryEdit};
