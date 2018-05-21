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


const FormReviewlapsetoEdit = (props) => {
  return (<Edit title="审阅转归"  {...props} >
    <SimpleForm>
     <TextField label="barden评分" source="evaluatebardenscore"  />
     <ReferenceField label="评估护士" source="signed_nurse" reference="user" allowEmpty>
       <TextField source="Staffname" />
     </ReferenceField>
     <ReferenceField label="护士长" source="signed_headnurse" reference="user" allowEmpty>
       <TextField source="Staffname" />
     </ReferenceField>
     <ReferenceField label="主管部门" source="signed_nursingdepartment" reference="user" allowEmpty>
       <TextField source="Staffname" />
     </ReferenceField>
     <ReferenceField label="病人" source="userpatientid" reference="patientinfo" allowEmpty>
       <TextField source="Patientname" />
     </ReferenceField>
    </SimpleForm>
  </Edit>
  );
};

const FormReviewlapsetoFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="评估护士" source="signed_nurse" reference="user" allowEmpty>
      <SelectInput optionText="Staffname" />
    </ReferenceInput>
    <ReferenceInput label="护士长" source="signed_headnurse" reference="user" allowEmpty>
      <SelectInput optionText="Staffname" />
    </ReferenceInput>
    <ReferenceInput label="主管部门" source="signed_nursingdepartment" reference="user" allowEmpty>
      <SelectInput optionText="Staffname" />
    </ReferenceInput>
    <ReferenceInput label="病人" source="userpatientid" reference="patientinfo" allowEmpty>
      <SelectInput optionText="Patientname" />
    </ReferenceInput>
  </Filter>
)

const FormReviewlapsetoList = (props) => (
  <List title="审阅转归" filters={<FormReviewlapsetoFilter />} {...props} sort={{field:'FormReviewlapsetono',order:'DESC'}}>
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <TextField label="barden评分" source="evaluatebardenscore"  />
      <ReferenceField label="评估护士" source="signed_nurse" reference="user" allowEmpty>
        <TextField source="Staffname" />
      </ReferenceField>
      <ReferenceField label="护士长" source="signed_headnurse" reference="user" allowEmpty>
        <TextField source="Staffname" />
      </ReferenceField>
      <ReferenceField label="主管部门" source="signed_nursingdepartment" reference="user" allowEmpty>
        <TextField source="Staffname" />
      </ReferenceField>
      <ReferenceField label="病人" source="userpatientid" reference="patientinfo" allowEmpty>
        <TextField source="Patientname" />
      </ReferenceField>
      <TextField source="stagestatus" label="状态" />
      <TextField source="created_at" label="新建时间" />
      <EditButton />
    </Datagrid>
  </List>
);

export {FormReviewlapsetoList,FormReviewlapsetoEdit};
