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


const ReviewEdit = (props) => {
  return (<Edit title="编辑科室"  {...props} >
    <SimpleForm>
     <TextField label="科室编号" source="Reviewno"  />
     <TextField label="科室名称" source="Reviewname"  />
     <SelectInput  label="科室属性"  source="DepProperty" choices={[
         { id: '0', name: '住院科室' },
         { id: '1', name: '病区' },
         { id: '1', name: '门诊科室' },
     ]} />
    </SimpleForm>
  </Edit>
  );
};

const ReviewFilter = (props) => (
  <Filter {...props}>
    <TextInput label="科室编号" source="Reviewno_q" />
    <TextInput label="科室名称" source="Reviewname_q" />
    <SelectInput  label="科室属性"  source="DepProperty" choices={[
        { id: '0', name: '住院科室' },
        { id: '1', name: '病区' },
        { id: '1', name: '门诊科室' },
    ]} />
  </Filter>
)

const ReviewList = (props) => (
  <List title="科室管理" filters={<ReviewFilter />} {...props} sort={{field:'Reviewno',order:'DESC'}}>
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <TextField label="科室编号" source="Reviewno"  />
      <TextField label="科室名称" source="Reviewname"  />
      <TextField label="科室属性" source="DepProperty" />
      <EditButton />
    </Datagrid>
  </List>
);

export {ReviewList,ReviewEdit};
