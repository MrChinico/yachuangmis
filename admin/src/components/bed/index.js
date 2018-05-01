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


const BedEdit = (props) => {
  return (<Edit title="编辑床位"  {...props} >
    <SimpleForm>
     <TextField label="床位号" source="Bedno" />
     <TextField label="床位名称" source="Bedname"  />
     <ReferenceInput label="所在科室" source="depatid" reference="depat" allowEmpty>
       <SelectInput optionText="Depatname" />
     </ReferenceInput>
     <SelectInput  label="床位性质"  source="BedProperty" choices={[
         { id: '0', name: '普通床位' },
         { id: '1', name: '智能设备床位' },
     ]} />
     <ReferenceInput label="智能设备" source="smartdeiveid" reference="smartdevice" allowEmpty>
       <SelectInput optionText="deviceid" />
     </ReferenceInput>
    </SimpleForm>
  </Edit>
  );
};

const BedFilter = (props) => (
  <Filter {...props}>
    <TextInput label="搜索床位号" source="Bedno_q" />
    <TextInput label="床位名称" source="Bedname_q" />
    <TextInput label="科室编号" source="Depatno_q" />
    <SelectInput  label="床位性质"  source="BedProperty" choices={[
        { id: '0', name: '普通床位' },
        { id: '1', name: '智能设备床位' },
    ]} />
  </Filter>
)

const BedList = (props) => (
  <List title="床位管理" filters={<BedFilter />} {...props} sort={{field:'Bedno',order:'DESC'}}>
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <TextField label="床位号" source="Bedno" />
      <TextField label="床位名称" source="Bedname"  />
      <TextField label="科室编号" source="Depatno"  />
      <TextField label="床位性质" source="BedProperty" />
      <ReferenceField label="所在科室" source="depatid" reference="depat" allowEmpty>
        <TextField source="Depatname" />
      </ReferenceField>
      <ReferenceField label="智能设备" source="smartdeiveid" reference="smartdevice" allowEmpty>
        <TextField source="deviceid" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export {BedList,BedEdit};
