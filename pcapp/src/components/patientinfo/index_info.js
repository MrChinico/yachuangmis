import React from 'react';
import { connect } from 'react-redux';
import { Layout,Button } from 'antd';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import InfoBarden from './info_barden';
import InfoNursingmeasures from './info_nursingmeasures';
import InfoWoundsurface from './info_woundsurface';
import InfoSmartdevice from '../smartdevice/patientinfo_smartdevice';
import InfoLapsetto from '../evaluate/lapseto';
import TitleDetail from './patientinfo_content_title_detail';

import {getevaluatebardenlist_request} from '../../actions';
import {getevaluatenursingmeasureslist_request} from '../../actions';
import {getevaluatewoundsurfacelist_request} from '../../actions';

import './index_details.css';

const { Header } = Layout;
let defaultbtnkey = 'btnbd';
class App extends React.Component {
		constructor(props) {
				super(props);
				this.state = {
						btnkey : defaultbtnkey
				};
		}
		componentDidMount(){
			const {curpaientinfo} = this.props;
			if(!!curpaientinfo){
				this.props.dispatch(getevaluatebardenlist_request({query:{userpatientid:curpaientinfo._id}}));
				this.props.dispatch(getevaluatenursingmeasureslist_request({query:{userpatientid:curpaientinfo._id}}));
				this.props.dispatch(getevaluatewoundsurfacelist_request({query:{userpatientid:curpaientinfo._id}}));
			}
		}

		componentWillUnmount() {
		}

		changePage = (btnkey)=>{
			this.setState({btnkey});
			defaultbtnkey = btnkey;
		}

  	render() {
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			const {btnkey} = this.state;
			let btnz = [];
			const btninfoz = [
				{
					btnkey:'btnbd',
					title:'Barden评估',
					visible:true,
					enabled:true
				},
				{
					btnkey:'btnws',
					title:'创面评估',
					visible:true,
					enabled:true
				},
				{
					btnkey:'btnnm',
					title:'护理措施',
					visible:true,
					enabled:true
				},
				{
					btnkey:'btnls',
					title:'转归与申报',
					visible:true,
					enabled:true
				},
				{
					btnkey:'btnto',
					title:'翻身治疗',
					visible:true,
					enabled:true
				},

			];

			lodashmap(btninfoz,(btninfo)=>{
				if(btninfo['btnkey']=== btnkey){
					btnz.push({
						clsname:'on',
						btnkey:btninfo['btnkey'],
						title:btninfo['title'],
						enabled:btninfo['enabled'],
						visible:btninfo['visible'],
					});
				}
				else{
					btnz.push({
						clsname:'off',
						btnkey:btninfo['btnkey'],
						title:btninfo['title'],
						enabled:btninfo['enabled'],
						visible:btninfo['visible'],
					});
				}
			});

			if(!curpaientinfo.firstevaluatebardenid){
				//没有首次评估,仅显示第一个按钮
				lodashmap(btnz,(info,index)=>{
					if(index > 0){
						info.visible = false;
					}
				})
			}
			return (
					<Layout>
						<Header>
							<span><img src="index.png" className="icon-index" alt=""/>病人评估</span>
						</Header>
						<div className="content-box">
						<div className="content assess">
							<h2>{lodashget(curpaientinfo,'Patientno','')}<span>{lodashget(curpaientinfo,'Patientname','')}</span>
								<button className="return" onClick={
									()=>{
										defaultbtnkey = 'btnbd';
										this.props.history.goBack();
									}
								}><img src="return.png" alt=""/></button>
								<div className="clearfix"></div>
							</h2>
							<TitleDetail curpaientinfo={curpaientinfo} />
							<div className="assess-btn-box">
								{
									lodashmap(btnz,(btninfo,index)=>{
										if(btninfo.visible){
											return (<div className="assess-btn" key={index}>
											<Button className={btninfo.clsname} onClick={
												()=>{
													if(btninfo.enabled){
														this.changePage(btninfo.btnkey);
													}
												}
											}>{btninfo.title}</Button>
											</div>)
										}
									})
								}
							</div>
							</div>
								<div className="record">
									{this.state.btnkey === 'btnbd' && <InfoBarden curpaientinfo={curpaientinfo} />}
									{this.state.btnkey === 'btnws' && <InfoWoundsurface curpaientinfo={curpaientinfo} />}
									{this.state.btnkey === 'btnnm' && <InfoNursingmeasures curpaientinfo={curpaientinfo} />}
									{this.state.btnkey === 'btnls' && <InfoLapsetto curpaientinfo={curpaientinfo} />}
									{this.state.btnkey === 'btnto' && <InfoSmartdevice curpaientinfo={curpaientinfo} />}
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
