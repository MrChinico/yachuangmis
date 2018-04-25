import React from 'react';
import { connect } from 'react-redux';
import { Layout,Button,Pagination } from 'antd';
import lodashget from 'lodash.get';
import InfoBarden from './info_barden';
import InfoNursingmeasures from './info_nursingmeasures';
import InfoWoundsurface from './info_woundsurface';
import InfoSmartdevice from '../smartdevice/patientinfo_smartdevice';
import InfoLapsetto from '../evaluate/lapseto';
import './index_details.css';

const { Header } = Layout;
class App extends React.Component {
		constructor(props) {
				super(props);
				this.state = {
						btnindex : 0
				};
		}
		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			return (
					<Layout>
						<Header>
							<span><img src="index.png" className="icon-index"/>病人列表-张三丰</span>
						</Header>
						<div className="content-box">
						<div className="content assess">
							<h2>21206<span>张三丰</span>
								<button className="return" onClick={
									()=>{
										this.props.history.goBack();
									}
								}><img src="return.png" /></button>
								<div className="clearfix"></div>
							</h2>
							<ul>
								<li>病人主键：<span className="on">普通压疮</span></li>
								<div className="clearfix"></div>
							</ul>
							<div className="assess-btn-box">
								<div className="assess-btn">
								<Button className="on" onClick={
									()=>{
										this.setState({btnindex:0});
									}
								}>Barden评估</Button>
								</div>
								<div className="assess-btn">
								<Button onClick={
									()=>{
										this.setState({btnindex:1});
									}
								}>创面评估</Button>
								</div>
								<div className="assess-btn">
								<Button onClick={
									()=>{
										this.setState({btnindex:2});
									}
								}>护理措施</Button>
								</div>
								<div className="assess-btn">
								<Button onClick={
									()=>{
										this.setState({btnindex:3});
									}
								}>转归与申报</Button>
								</div>
								<div className="assess-btn">
								<Button onClick={
									()=>{
										this.setState({btnindex:4});
									}
								}>翻身治疗</Button>
								</div>
							</div>
							</div>
							
							<div>
								<div className="record">{this.state.btnindex === 0 && <InfoBarden curpaientinfo={curpaientinfo} />}</div>
								{this.state.btnindex === 1 && <InfoWoundsurface curpaientinfo={curpaientinfo} />}
								{this.state.btnindex === 2 && <InfoNursingmeasures curpaientinfo={curpaientinfo} />}
								{this.state.btnindex === 3 && <InfoLapsetto curpaientinfo={curpaientinfo} />}
								{this.state.btnindex === 4 && <InfoSmartdevice curpaientinfo={curpaientinfo} />}
							</div>

							<div className="record-box">
								<ul>
									<li>
										<span>2018/03/12 12:30</span>
										<span>Barden评分：16分</span>
										<span>评分护士：王小五</span>
										<span>详细信息</span>
									</li>
									<li>
										<span>2018/03/12 12:30</span>
										<span>Barden评分：16分</span>
										<span>评分护士：王小五</span>
										<span>详细信息</span>
									</li>
									<li>
										<span>2018/03/12 12:30</span>
										<span>Barden评分：16分</span>
										<span>评分护士：王小五</span>
										<span>详细信息</span>
									</li>
								</ul>
							</div>

							<Pagination defaultCurrent={1} total={50} />
							<div>
								<button className="ant-btn-edit blue">查看选中记录</button>
							</div>

						</div>
						
					</Layout>
					
			);
  	}
}

const mapStateToProps = ({paientinfo},props) => {
		const {paientinfos} = paientinfo;
		const id = lodashget(props,'match.params.pid');
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo};
}
export default connect(mapStateToProps)(App);
