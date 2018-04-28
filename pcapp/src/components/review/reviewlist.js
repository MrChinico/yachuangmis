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

						<div className="content-box">
							<div className="content">
								<h4>21206<span>张三丰</span>
									<button className="return" onClick={
										()=>{
											this.props.history.replace('/');
										}
									}><img src="return.png" alt=""/></button>
									<div className="clearfix"></div>
								</h4>
								<form>
									<table width="100%" border="0" className="declare-review-list">
										<tr className="top">
											<td><div align="center">序号</div></td>
											<td><div align="center">姓名</div></td>
											<td><div align="center">住院号</div></td>
											<td><div align="center">科室</div></td>
											<td><div align="center">入院时间</div></td>
											<td><div align="center">床号</div></td>
											<td><div align="center">申请护士</div></td>
											<td><div align="center">护士审阅</div></td>
											<td><div align="center">护理部审阅</div></td>
										</tr>
										<tr>
											<td><div align="center">0001</div></td>
											<td><div align="center">张三丰</div></td>
											<td><div align="center">20250</div></td>
											<td><div align="center">皮肤科</div></td>
											<td><div align="center">2018/04/12-15:20</div></td>
											<td><div align="center">压疮病区A15智能床</div></td>
											<td><div align="center">杜拉拉</div></td>
											<td><div align="center">无无无-已审</div></td>
											<td><div align="center">待审</div></td>
										</tr>
										<tr>
											<td><div align="center">0001</div></td>
											<td><div align="center">张三丰</div></td>
											<td><div align="center">20250</div></td>
											<td><div align="center">皮肤科</div></td>
											<td><div align="center">2018/04/12-15:20</div></td>
											<td><div align="center">压疮病区A15智能床</div></td>
											<td><div align="center">杜拉拉</div></td>
											<td><div align="center">无无无-已审</div></td>
											<td><div align="center">待审</div></td>
										</tr>
										<tr>
											<td><div align="center">0001</div></td>
											<td><div align="center">张三丰</div></td>
											<td><div align="center">20250</div></td>
											<td><div align="center">皮肤科</div></td>
											<td><div align="center">2018/04/12-15:20</div></td>
											<td><div align="center">压疮病区A15智能床</div></td>
											<td><div align="center">杜拉拉</div></td>
											<td><div align="center">无无无-已审</div></td>
											<td><div align="center">待审</div></td>
										</tr>
										<tr>
											<td><div align="center">0001</div></td>
											<td><div align="center">张三丰</div></td>
											<td><div align="center">20250</div></td>
											<td><div align="center">皮肤科</div></td>
											<td><div align="center">2018/04/12-15:20</div></td>
											<td><div align="center">压疮病区A15智能床</div></td>
											<td><div align="center">杜拉拉</div></td>
											<td><div align="center">无无无-已审</div></td>
											<td><div align="center">待审</div></td>
										</tr>
									</table>
								</form>
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
