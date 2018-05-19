import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import HeadTitle from './index_title';
import Patientinfolist from './index_patientinfolist';
import Changepwd from "../popdialog/pwd.js";
import Usercenter from "../popdialog/usercenter.js";
import {getcount_reviewlapseto_request} from '../../actions';

class App extends React.Component {

	// constructor(props) {
  //       super(props);
  //   }

		componentDidMount(){
			this.props.dispatch(getcount_reviewlapseto_request({}));
		}

		componentWillUnmount() {

		}

  	render() {
			const {ispopuserinfo,ispoppwd} = this.props;
	    return (
	      	<Layout>
						<HeadTitle showbtns={true}/>
						<Patientinfolist query={{}}
						db={this.props.db}
						history={this.props.history}/>
						{ispopuserinfo  && <Usercenter /> }
						{ispoppwd && <Changepwd />}
	      	</Layout>
	    );
  	}
}

const mapStateToProps = ({app:{ispopuserinfo,ispoppwd},db}) => {
    return {ispopuserinfo,ispoppwd,db};
}
export default connect(mapStateToProps)(App);
