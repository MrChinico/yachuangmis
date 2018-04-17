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

import DefineTurnover from './smartdevice/defineturnover';

import Datastat from './datastat';
import Datastatdetail from './datastat/detaillist';
import Review from './review/reviewlist';
import ReviewDetail from './review/reviewdetail';
// import Login from './login';
import 'antd/dist/antd.css';
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
                  <Route exact path="/indexdetail/:id" component={IndexDetail} />
                  <Route exact path="/indexdetailedit/:id" component={IndexDetailEdit} />
                  <Route exact path="/indexinfo/:id" component={IndexInfo} />
                  <Route exact path="/newbarden/:pid/:id" component={NewBarden} />
                  <Route exact path="/newnursingmeasures/:pid/:id" component={NewNursingmeasures} />
                  <Route exact path="/newwoundsurface/:pid/:id" component={NewWoundsurface} />
                  <Route exact path="/defineturnover/:pid/:bid" component={DefineTurnover} />

                  <Route exact path="/datastat" component={Datastat} />
                  <Route exact path="/datastatdetail/:type" component={Datastatdetail} />
                  <Route exact path="/review" component={Review} />
                  <Route exact path="/reviewdetail/:rid" component={ReviewDetail} />

                  {/* <Route exact path="/login" component={Login} /> */}
                </Switch>
              </div>

      );
  }
}
export default connect()(AppRoot);
