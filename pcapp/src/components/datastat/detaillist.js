import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout,Button } from 'antd';
import IndexHead from '../index/index_title';
import lodashget from 'lodash.get';


class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
	    return (
	      	<Layout>
						<IndexHead />
						<div>数据统计</div>
						<span><Button onClick={
							()=>{
								this.props.history.goBack();
							}
						}>返回上页</Button></span>
						<div>
							<span>病人列表</span>
							<span>分页</span>
						</div>
	      	</Layout>
	    );
  	}
}


export default connect()(App);
