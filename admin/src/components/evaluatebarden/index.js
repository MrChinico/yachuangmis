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


const EvaluatebardenEdit = (props) => {
  return (<Edit title="Barden评估"  {...props} >
    <SimpleForm>
       <ReferenceInput label="评估护士" source="usercreatorid" reference="user" allowEmpty>
       <SelectInput optionText="Staffname" />
     </ReferenceInput>
     <ReferenceInput label="病人" source="userpatientid" reference="patientinfo" allowEmpty>
       <SelectInput optionText="Patientname" />
     </ReferenceInput>
     <TextField source="score_sensoryperception" label="感知" />
     <TextField source="score_moisture" label="潮湿" />
     <TextField source="score_activity" label="活动能力" />
     <TextField source="score_mobility" label="移动能力" />
     <TextField source="score_nutrition" label="营养" />
     <TextField source="score_friction" label="摩擦力/剪切力" />
     <TextField source="score" label="评估分数" />
     <TextField source="created_at" label="新建时间" />
     <TextField source="updated_at" label="最后更新" />
    </SimpleForm>
  </Edit>
  );
};

const EvaluatebardenFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="评估护士" source="usercreatorid" reference="user" allowEmpty>
      <SelectInput optionText="Staffname" />
    </ReferenceInput>
    <ReferenceInput label="病人" source="userpatientid" reference="patientinfo" allowEmpty>
      <SelectInput optionText="Patientname" />
    </ReferenceInput>
  </Filter>
)

const EvaluatebardenList = (props) => (
  <List title="Barden评估" filters={<EvaluatebardenFilter />} {...props} sort={{field:'Evaluatebardenno',order:'updated_at'}}>
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <ReferenceField label="评估护士" source="usercreatorid" reference="user" allowEmpty>
        <TextField source="Staffname" />
      </ReferenceField>
      <ReferenceField label="病人" source="userpatientid" reference="patientinfo" allowEmpty>
        <TextField source="Patientname" />
      </ReferenceField>
      <TextField source="created_at" label="新建时间" />
      <TextField source="score" label="评估分数" />
      <EditButton />
    </Datagrid>
  </List>
);

export {EvaluatebardenList,EvaluatebardenEdit};
