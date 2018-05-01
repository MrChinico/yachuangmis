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
			this.props.history.push(`/datastatdetail/${type}`);
		}
  	render() {
	    return (
	      	<Layout>
					<IndexHead />
					<div className="content-box">
						<div className="content assess">
							<h2 className="none-border">
								<button className="return" onClick={
									()=>{
										this.props.history.replace('/');
									}
								}><img src="return.png"  alt=""/></button>
								<div className="clearfix"></div>
							</h2>
						</div>

						<div className="datastat-chart">
							<div className="chart chart-one" onClick={()=>{
								this.onClickStatDetail(0);
							}}><h1>统计图1<span className="fontSize14">%</span></h1>
								<p className="num">2301人</p>
								<img src="chart01.png"  alt=""/>
								<p className="total-num">某某发生率<br/>总人数：45123人</p>
							</div>
							<div className="chart chart-two" onClick={()=>{
								this.onClickStatDetail(1);
							}}><h1>统计图2<span className="fontSize14">%</span></h1>
								<p className="num">2301人</p>
								<img src="chart02.png"  alt=""/>
								<p className="total-num">某某发生率<br/>总人数：45123人</p></div>
							<div className="chart chart-three" onClick={()=>{
								this.onClickStatDetail(2);
							}}><h1>统计图3<span className="fontSize14">%</span></h1>
								<p className="num">2301人</p>
								<img src="chart03.png"  alt=""/>
								<p className="total-num">某某发生率<br/>总人数：45123人</p></div>
						</div>
					</div>

	      	</Layout>
	    );
  	}
}


export default connect()(App);
