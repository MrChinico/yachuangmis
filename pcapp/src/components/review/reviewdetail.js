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
						<div>审阅详细</div>
						<span><Button>打印</Button></span>
						<span><Button onClick={
							()=>{
								this.props.history.goBack();
							}
						}>返回上页</Button></span>
						<div>这里是表单</div>
						<div>
							<Button onClick={
								()=>{
									this.props.history.goBack();
								}
							}>确定审阅</Button>
						</div>
	      	</Layout>
	    );
  	}
}

// const mapStateToProps = ({paientinfo},props) => {
// 		const {paientinfos} = paientinfo;
// 		const id = lodashget(props,'match.params.pid');
// 		let curpaientinfo = paientinfos[id];
//     return {curpaientinfo};
// }
// App = withRouter(App);
export default connect()(App);
