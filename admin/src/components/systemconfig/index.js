import React from 'react';
import {
    required,
    Datagrid,
    DateField,
    Create,
    EditButton,
    Filter,
    FormTab,
    List,
    NumberInput,
    ReferenceInput,
    ReferenceManyField,
    RichTextField,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
    SimpleShowLayout,
    SelectArrayInput,
    ChipField,
    Edit as EditPage,
    Show as ShowPage,
    SimpleForm,
} from 'admin-on-rest/lib/mui';
import Chip from 'material-ui/Chip';
import ShowPageOne from '../singledocumentpage/index.js';

import "./style.css";


const SystemconfigTitle = ({ record }) => <span>系统设置</span>;


const SystemconfigCreateTitle = ({ record }) => {
   return <span>新建 系统配置</span>;
};
 const SystemconfigCreate = (props) => (
       <Create {...props} title={<SystemconfigCreateTitle />} >
       <TabbedForm>
         <FormTab label="系统设置">
           <TextInput label="医院名字" source="Hospitalname" validate={required} />
         </FormTab>
        <FormTab label="His接口">
          <TextInput label="病人接口" source="url_patientinfo" validate={required} />
          <TextInput label="科室接口" source="url_depat" validate={required} />
          <TextInput label="病床接口" source="url_bed" validate={required} />
          <TextInput label="员工接口" source="url_staff" validate={required} />
        </FormTab>
       </TabbedForm>
       </Create>
);

 const SystemconfigEdit = (props) => (
    <EditPage {...props} title={<SystemconfigTitle />}>
      <TabbedForm>
        <FormTab label="系统设置">
          <TextInput label="医院名字" source="Hospitalname" validate={required} />
        </FormTab>
        <FormTab label="His接口">
          <TextInput label="病人接口" source="url_patientinfo" validate={required} />
          <TextInput label="科室接口" source="url_depat" validate={required} />
          <TextInput label="病床接口" source="url_bed" validate={required} />
          <TextInput label="员工接口" source="url_staff" validate={required} />
        </FormTab>
        </TabbedForm>
    </EditPage>
);

export const SystemconfigList = props => (
    <ShowPageOne Create={SystemconfigCreate} Edit={SystemconfigEdit} {...props}/>
);
