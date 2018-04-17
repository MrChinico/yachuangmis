import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
const {Header } = Layout;
class App extends React.Component {
		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
	    return (
	      	<Header>
            头部
	      	</Header>
	    );
  	}
}


export default connect()(App);
