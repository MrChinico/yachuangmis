import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout,Button,Pagination } from 'antd';
import IndexHead from '../index/index_title';
import lodashget from 'lodash.get';
import './reviewlist.css';


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

						<div className="content-box">
							<div className="content">
								<h2>21206<span>张三丰</span>
									<button className="return" onClick={
										()=>{
											this.props.history.replace('/');
										}
									}><img src="return.png" alt=""/></button>
									<div className="clearfix"></div>
								</h2>
								<ul>
									<li>病人主键：普通压疮</li>
									<li>住院号码：20015</li>
									<li>住院号码：20015</li>
									<div className="clearfix"></div>
								</ul>
								<div>
									<button className="ant-btn-edit" onClick={
										()=>{
											this.onClickEdit();
										}
									}>编辑信息</button>
								</div>
							</div>
							<div>
								这里是表格
								<span><Button onClick={
									()=>{
										this.onClickReviewDetail(0);
									}
								}>点击表格中某元素</Button></span>
							</div>
							<div>
							<Pagination defaultCurrent={1} total={50} />
							</div>
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
