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


const EvaluatewoundsurfaceEdit = (props) => {
  return (<Edit title="创面评估"  {...props} >
    <SimpleForm>
      <ReferenceInput label="评估护士" source="usercreatorid" reference="user" allowEmpty>
      <SelectInput optionText="username" />
      </ReferenceInput>
      <ReferenceInput label="病人" source="userpatientid" reference="patientinfo" allowEmpty>
        <SelectInput optionText="Patientname" />
      </ReferenceInput>
      <TextField source="created_at" label="新建时间" />
      <TextField source="updated_at" label="最后更新" />
    </SimpleForm>
  </Edit>
  );
};

const EvaluatewoundsurfaceFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="评估护士" source="usercreatorid" reference="user" allowEmpty>
      <SelectInput optionText="username" />
    </ReferenceInput>
    <ReferenceInput label="病人" source="userpatientid" reference="patientinfo" allowEmpty>
      <SelectInput optionText="Patientname" />
    </ReferenceInput>
  </Filter>
)

const EvaluatewoundsurfaceList = (props) => (
  <List title="创面评估" filters={<EvaluatewoundsurfaceFilter />} {...props} sort={{field:'Evaluatewoundsurfaceno',order:'DESC'}}>
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <ReferenceField label="评估护士" source="usercreatorid" reference="user" allowEmpty>
        <TextField source="username" />
      </ReferenceField>
      <ReferenceField label="病人" source="userpatientid" reference="patientinfo" allowEmpty>
        <TextField source="Patientname" />
      </ReferenceField>
      <TextField source="created_at" label="新建时间" />
      <EditButton />
    </Datagrid>
  </List>
);

export {EvaluatewoundsurfaceList,EvaluatewoundsurfaceEdit};
