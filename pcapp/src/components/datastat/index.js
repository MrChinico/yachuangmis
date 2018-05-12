import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import IndexHead from '../index/index_title';
// import lodashget from 'lodash.get';


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
					<IndexHead title="数据统计"/>
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
							}}><h1>压疮率I<span className="fontSize14"></span></h1>
								<p className="num">80%</p>
								<img src="chart01.png"  alt=""/>
								<p className="total-num">压疮发生率<br/>人数：513人</p>
							</div>

							<div className="chart chart-two" onClick={()=>{
								this.onClickStatDetail(1);
							}}>
								<h1>压疮率II<span className="fontSize14"></span></h1>
								<p className="num">50%</p>
								<img src="chart02.png"  alt=""/>
								<p className="total-num">高危患者压疮发生率<br/>人数：453人</p></div>

							<div className="chart chart-three" onClick={()=>{
								this.onClickStatDetail(2);
							}}>
								<h1>治愈率<span className="fontSize14"></span></h1>
								<p className="num">90%</p>
								<img src="chart03.png"  alt=""/>
								<p className="total-num">压疮治愈率<br/>总人数：123人</p></div>
						</div>
					</div>

	      	</Layout>
	    );
  	}
}


export default connect()(App);
