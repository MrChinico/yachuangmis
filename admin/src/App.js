// import 'babel-polyfill';
import React, { Component } from 'react';
import { Admin, Resource ,Delete} from 'admin-on-rest';
import themeReducer from './themeReducer';
import authClient from './authClient';

// import logo from './logo.svg';
import './App.css';
import sagas from './sagas';
import Login from './Login';
import Layout from './Layout';
import Menu from './menu/Menu';
//import { Dashboard } from './dashboard';
import CustomRoutes from './routes';
import translations from './i18n';
import restClient from './restClient';
import singledocumentpage from './components/singledocumentpage/reducer';
import menu from './menu/reducer';

import {SystemconfigList} from './components/systemconfig/index.js';
import {BedList,BedEdit} from './components/bed/index.js';
import {DepatList,DepatEdit} from './components/depat/index.js';
import {PatientinfoList,PatientinfoEdit} from './components/patientinfo/index.js';
import {UserCreate,UserList,UserEdit} from './components/users/index.js';
import {PermissionCreate,PermissionList,PermissionEdit} from './components/permissions/index.js';

import systemconfigreducer from './components/systemconfig/reducer';

class App extends Component {

    render() {
        return (
            <Admin
                title="医院压疮管理后台"
                restClient={restClient}
                customReducers={{
                  theme:themeReducer,
                  systemconfig:systemconfigreducer,
                  singledocumentpage,
                  menu
                 }}
                customSagas={sagas}
                customRoutes={CustomRoutes}
                authClient={authClient}
                loginPage={Login}
                appLayout={Layout}
                menu={Menu}
                locale="cn"
                messages={translations}
            >
            {
              permissions => {
                return [
                    <Resource name="systemconfig" list={SystemconfigList} />,
                    <Resource name="patientinfo" list={PatientinfoList} edit={PatientinfoEdit} />,
                    <Resource name="depat" list={DepatList} edit={DepatEdit} />,
                    <Resource name="bed" list={BedList} edit={BedEdit} />,
                    <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} />,
                    <Resource name="permission" list={PermissionList} edit={PermissionEdit} create={PermissionCreate}  remove={Delete} />,
                  ];
                }
            }
            </Admin>
        );
    }
}

export default App;
