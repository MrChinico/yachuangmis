import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
const {Content } = Layout;
class App extends React.Component {

	// constructor(props) {
  //       super(props);
  //   }

		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
	    return (
	      	<Content>
            病人列表
	      	</Content>
	    );
  	}
}


export default connect()(App);
