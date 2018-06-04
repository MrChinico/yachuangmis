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


const PatientinfoEdit = (props) => {
  return (<Edit title="编辑病人"  {...props} >
    <SimpleForm>
     <TextField label="病人编号" source="Patientid"  />
     <TextField label="住院号码" source="Patientno"  />
     <TextField label="病人姓名" source="Patientname"  />
     <TextField label="病人性别" source="Sex"  />
     <TextField label="出生年月" source="Birthday"  />
     <TextField label="入院日期" source="In_date"  />
     <TextField label="出院日期" source="Out_date"  />
     <TextField label="入院诊断" source="In_diagnosis"  />
     <TextField label="在院判别" source="In_out_flag"  />
      <TextField label="在院判别" source="In_out_flag"  />
      <SelectInput label="病人分类"  source="Diseaseclassification" choices={[
          { id: '难免压疮', name: '难免压疮' },
          { id: '院前压疮', name: '院前压疮' },
          { id: '院内压疮', name: '院内压疮' },
          { id: '普通病人', name: '普通病人' },
      ]} />
     <ReferenceInput label="所在科室" source="depatid" reference="depat" allowEmpty>
       <SelectInput optionText="Depatname" />
     </ReferenceInput>
     <ReferenceInput label="所在床位" source="bedid" reference="bed" allowEmpty>
       <SelectInput optionText="Bedname" />
     </ReferenceInput>
    </SimpleForm>
  </Edit>
  );
};

const PatientinfoFilter = (props) => (
  <Filter {...props}>
    <TextInput label="科室编号" source="Depatno_q" />
    <TextInput label="科室名称" source="Depatname_q" />
  </Filter>
)

const PatientinfoList = (props) => (
  <List title="病人管理" filters={<PatientinfoFilter />} {...props} sort={{field:'In_date',order:'DESC'}}>
    <Datagrid  bodyOptions={{ showRowHover: true }}>
      <TextField label="病人编号" source="Patientid"  />
      <TextField label="住院号码" source="Patientno"  />
      <TextField label="病人姓名" source="Patientname"  />
      <TextField label="病人性别" source="Sex"  />
      <TextField label="病人分类" source="Diseaseclassification"  />
      <ReferenceField label="所在科室" source="depatid" reference="depat" allowEmpty>
        <TextField source="Depatname" />
      </ReferenceField>
      <ReferenceField label="所在床位" source="bedid" reference="bed" allowEmpty>
        <TextField source="Bedname" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export {PatientinfoList,PatientinfoEdit};
