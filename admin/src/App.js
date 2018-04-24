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
import {NursingDepatList,NursingDepatEdit,NursingDepatCreate} from './components/nursingdepat/index';
import {PatientinfoList,PatientinfoEdit} from './components/patientinfo/index.js';
import {UserCreate,UserList,UserEdit} from './components/users/index.js';
import {PermissionCreate,PermissionList,PermissionEdit} from './components/permissions/index.js';

import {EvaluatebardenList,EvaluatebardenEdit} from './components/evaluatebarden';
import {EvaluatenursingmeasuresList,EvaluatenursingmeasuresEdit} from './components/evaluatenursingmeasures';
import {EvaluatewoundsurfaceList,EvaluatewoundsurfaceEdit} from './components/evaluatewoundsurface';
import {FormReviewlapsetoList,FormReviewlapsetoEdit} from './components/formreviewlapseto';
import {SmartdeviceList,SmartdeviceEdit} from './components/smartdevice';
import {TurnoverstrategyList,TurnoverstrategyEdit} from './components/turnoverstrategy';


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
                    <Resource name="nursingdepat" list={NursingDepatList} edit={NursingDepatEdit} create={NursingDepatCreate}  remove={Delete}/>,
                    <Resource name="bed" list={BedList} edit={BedEdit} />,
                    <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} />,
                    <Resource name="permission" list={PermissionList} edit={PermissionEdit} create={PermissionCreate}  remove={Delete} />,

                    <Resource name="evaluatebarden" list={EvaluatebardenList} edit={EvaluatebardenEdit} />,
                    <Resource name="evaluatenursingmeasures" list={EvaluatenursingmeasuresList} edit={EvaluatenursingmeasuresEdit} />,
                    <Resource name="evaluatewoundsurface" list={EvaluatewoundsurfaceList} edit={EvaluatewoundsurfaceEdit} />,
                    <Resource name="formreivewlapseto" list={FormReviewlapsetoList} edit={FormReviewlapsetoEdit} />,
                    <Resource name="turnoverstrategy" list={TurnoverstrategyList} edit={TurnoverstrategyEdit} />,
                    <Resource name="smartdevice" list={SmartdeviceList} edit={SmartdeviceEdit} />,
                  ];
                }
            }
            </Admin>
        );
    }
}

export default App;
