import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { NumberInput,
  NumberField,
  Create,
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

const NursingDepatCreate = (props) => {
  return (<Create title="新建护理部"  {...props} >
    <SimpleForm>
     <TextInput label="护理部名字" source="name"  />
     <ReferenceInput label="负责人" source="nursingdepatuserid" reference="user" allowEmpty>
       <SelectInput optionText="username" />
     </ReferenceInput>
    </SimpleForm>
  </Create>
  );
};


const NursingDepatEdit = (props) => {
  return (<Edit title="编辑护理部"  {...props} >
    <SimpleForm>
     <TextInput label="护理部名字" source="name"  />
     <ReferenceInput label="负责人" source="nursingdepatuserid" reference="user" allowEmpty>
       <SelectInput optionText="username" />
     </ReferenceInput>
    </SimpleForm>
  </Edit>
  );
};


const NursingDepatList = (props) => (
  <List title="护理部管理" {...props} >
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <TextField label="护理部名字" source="name"  />
      <ReferenceField label="负责人" source="nursingdepatuserid" reference="user" allowEmpty>
        <TextField source="username" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export {NursingDepatList,NursingDepatEdit,NursingDepatCreate};
