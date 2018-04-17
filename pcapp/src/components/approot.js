import React from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import Index from './index';
// import Login from './login';

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
                  {/* <Route exact path="/login" component={Login} /> */}
                </Switch>
              </div>

      );
  }
}
export default connect()(AppRoot);
