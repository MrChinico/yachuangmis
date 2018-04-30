import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import HeadTitle from './index_title';
import Patientinfolist from './index_patientinfolist';
import Changepwd from "../popdialog/pwd.js";
import Usercenter from "../popdialog/usercenter.js";
class App extends React.Component {

	// constructor(props) {
  //       super(props);
  //   }

		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
			const {ispopuserinfo,ispoppwd} = this.props;
	    return (
	      	<Layout>
						<HeadTitle />
						<Patientinfolist query={{}}
						history={this.props.history}/>
						{ispopuserinfo  && <Usercenter /> }
						{ispoppwd && <Changepwd />}
	      	</Layout>
	    );
  	}
}

const mapStateToProps = ({app:{ispopuserinfo,ispoppwd}}) => {
    return {ispopuserinfo,ispoppwd};
}
export default connect(mapStateToProps)(App);
