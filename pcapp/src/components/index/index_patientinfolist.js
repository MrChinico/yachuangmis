import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import lodashmap from 'lodash.map';
import { Layout } from 'antd';
import { Pagination,Button } from 'antd';
import './index.css';

const { Content } = Layout;


const Paientinfo = (props)=>{
	const {curpaientinfo,onClickDetail,onClickEvalute} = props;
	const {Patientno,Patientname} = curpaientinfo;
	return (
			<div className="module-box">
				<div className="module">
					<div className="module-top">
						<h2>{Patientno}<span>{Patientname}</span></h2>
						<p>
							<span className="fontSize13">普通压疮</span>
							<button type="" className="ant-btn-details" onClick={
								()=>{
									onClickDetail(curpaientinfo._id)
								}
							}>详细</button>
						</p>
					</div>
					<div className="module-bottom">
						<span>病床:左转45度</span>
						<p>
							<span className="state">在床</span>
							<span>压疮三区A15</span>
							<button type="" className="ant-btn-assess" onClick={
								()=>{
									onClickEvalute(curpaientinfo._id)
								}
							}>评估</button>
						</p>
					</div>
				</div>
			</div>
	)
}

class App extends React.Component {

		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onClickDetail = (pid)=>{
			this.props.history.push(`/indexdetail/${pid}`);
		}
		onClickEvalute = (pid)=>{
			this.props.history.push(`/indexinfo/${pid}`);
		}
  	render() {
			const {paientinfolist,paientinfos} = this.props;
	    return (
	      	<Content>
          				{
							lodashmap(paientinfolist,(pid)=>{
								return (<Paientinfo key={pid}
									curpaientinfo={paientinfos[pid]}
									onClickDetail={()=>{this.onClickDetail(pid)}}
									onClickEvalute={()=>{this.onClickEvalute(pid)}}/>);
							})
						}
						<div className="clearfix"></div>
						<Pagination defaultCurrent={1} total={50} />
						
	      	</Content>
	    );
  	}
}


const mapStateToProps = ({paientinfo}) => {
		const {paientinfolist,paientinfos} = paientinfo;
    return {paientinfolist,paientinfos};
}
App = withRouter(App);
export default connect(mapStateToProps)(App);
