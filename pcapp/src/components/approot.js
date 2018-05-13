import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import Index from './index';
import IndexDetail from './patientinfo/index_detail';
import IndexDetailEdit from './patientinfo/edit';
import IndexInfo from './patientinfo/index_info';

import NewBarden from './evaluate/newbarden';
import NewNursingmeasures from './evaluate/newnursingmeasures';
import NewWoundsurface from './evaluate/newwoundsurface';
import NewLapseto from './evaluate/newlapseto';

import ViewPrintRecordBarden from './evaluate/recordbarden';
import ViewPrintRecordNursingmeasures from './evaluate/recordnursingmeasures';
import ViewPrintRecordWoundsurface from './evaluate/recordwoundsurface';

import DefineTurnover from './smartdevice/defineturnover';

import Datastat from './datastat';
import Datastatdetail from './datastat/detaillist';
import Review from './review/reviewlist';

import SearchPaientinfo from './index/index_search';

import Login from './login';
import './antd.css';
import {requireAuthentication} from './requireauthentication';




class AppRoot extends React.Component {
  componentWillMount() {

  }

    componentWillUnmount() {

    }
    render() {
      return (
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Index} />
                  <Route exact path="/indexdetail/:pid" component={IndexDetail} />
                  <Route exact path="/indexdetailedit/:pid" component={IndexDetailEdit} />
                  <Route exact path="/indexinfo/:pid" component={IndexInfo} />
                  <Route exact path="/newbarden/:pid/:id" component={NewBarden} />
                  <Route exact path="/newnursingmeasures/:pid/:id" component={NewNursingmeasures} />
                  <Route exact path="/newwoundsurface/:pid/:id" component={NewWoundsurface} />
                  <Route exact path="/newlapseto/:pid/:id" component={NewLapseto} />

                  <Route exact path="/viewprintrecordbarden/:pid" component={ViewPrintRecordBarden} />
                  <Route exact path="/viewprintrecordnursingmeasures/:pid" component={ViewPrintRecordNursingmeasures} />
                  <Route exact path="/viewprintrecordwoundsurface/:pid" component={ViewPrintRecordWoundsurface} />

                  <Route exact path="/defineturnover/:pid/:bid" component={DefineTurnover} />

                  <Route exact path="/searchpaientinfo" component={SearchPaientinfo} />
                  <Route exact path="/datastat" component={Datastat} />
                  <Route exact path="/datastatdetail/:type" component={Datastatdetail} />
                  <Route exact path="/review" component={Review} />
    
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>

      );
  }
}
export default connect()(AppRoot);
