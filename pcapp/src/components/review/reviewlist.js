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
		onClickReviewDetail = (rid)=>{
			this.props.history.push(`/reviewdetail/${rid}`)
		}
  	render() {
	    return (
	      	<Layout>
						<IndexHead />
						<div>审阅列表</div>
						<span><Button onClick={
							()=>{
								this.props.history.replace('/');
							}
						}>返回上页</Button></span>
						<div>
							这里是表格
							<span><Button onClick={
								()=>{
									this.onClickReviewDetail(0);
								}
							}>点击表格中某元素</Button></span>
						</div>
						<div>
							这里是分页
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
