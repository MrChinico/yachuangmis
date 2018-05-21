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


const DepatEdit = (props) => {
  return (<Edit title="编辑科室"  {...props} >
    <SimpleForm>
     <TextField label="科室编号" source="Depatno"  />
     <TextField label="科室名称" source="Depatname"  />
     <ReferenceInput label="护士长" source="headnurseid" reference="user" allowEmpty filter={{ permission: '5a03b66e13e7410cd0ef3094' }}>
       <SelectInput optionText="Staffname" />
     </ReferenceInput>
     <ReferenceInput label="护理部" source="nursingdepatid" reference="nursingdepat" allowEmpty>
       <SelectInput optionText="name" />
     </ReferenceInput>
     <SelectInput  label="科室属性"  source="DepProperty" choices={[
         { id: '0', name: '住院科室' },
         { id: '1', name: '病区' },
         { id: '2', name: '门诊科室' },
     ]} />
    </SimpleForm>
  </Edit>
  );
};

const DepatFilter = (props) => (
  <Filter {...props}>
    <TextInput label="科室编号" source="Depatno_q" />
    <TextInput label="科室名称" source="Depatname_q" />
    <SelectInput  label="科室属性"  source="DepProperty" choices={[
        { id: '0', name: '住院科室' },
        { id: '1', name: '病区' },
        { id: '2', name: '门诊科室' },
    ]} />
  </Filter>
)

const DepatList = (props) => (
  <List title="科室管理" filters={<DepatFilter />} {...props} sort={{field:'Depatno',order:'DESC'}}>
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <TextField label="科室编号" source="Depatno"  />
      <TextField label="科室名称" source="Depatname"  />
      <TextField label="科室属性" source="DepProperty" />
      <ReferenceField label="护士长" source="headnurseid" reference="user" allowEmpty>
        <TextField source="Staffname" />
      </ReferenceField>
      <ReferenceField label="护理部" source="nursingdepatid" reference="nursingdepat" allowEmpty>
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export {DepatList,DepatEdit};
