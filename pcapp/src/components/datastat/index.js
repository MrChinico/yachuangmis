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
		onClickStatDetail = (type)=>{
			this.props.history.push('/datastatdetail/${type}');
		}
  	render() {
	    return (
	      	<Layout>
						<IndexHead />
						<div>数据统计</div>
						<span><Button onClick={
							()=>{
								this.props.history.replace('/');
							}
						}>返回上页</Button></span>
						<div>
							<span onClick={()=>{
								this.onClickStatDetail(0);
							}}>统计图1</span>
							<span onClick={()=>{
								this.onClickStatDetail(1);
							}}>统计图2</span>
							<span onClick={()=>{
								this.onClickStatDetail(2);
							}}>统计图3</span>
						</div>
	      	</Layout>
	    );
  	}
}

// const mapStateToProps = ({paientinfo},props) => {
// 		const {paientinfos} = paientinfo;
// 		const id = lodashget(props,'match.params.id');
// 		let curpaientinfo = paientinfos[id];
//     return {curpaientinfo};
// }
// App = withRouter(App);
export default connect()(App);
