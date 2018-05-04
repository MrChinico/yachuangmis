import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import lodashget from 'lodash.get';
import lodashmap from 'lodash.map';
import InfoBarden from './info_barden';
import InfoNursingmeasures from './info_nursingmeasures';
import InfoWoundsurface from './info_woundsurface';
import InfoSmartdevice from '../smartdevice/patientinfo_smartdevice';
import InfoLapsetto from '../evaluate/lapseto';
import TitleDetail from './patientinfo_content_title_detail';
// import styled from 'styled-components';
import {getevaluatebardenlist_request} from '../../actions';
import {getevaluatenursingmeasureslist_request} from '../../actions';
import {getevaluatewoundsurfacelist_request} from '../../actions';
import {subscribedevice_request} from '../../actions';

import { Tabs } from 'antd';
import './index_info.css';

const TabPane = Tabs.TabPane;



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
			const {curpaientinfo,cursmartdevice} = this.props;
			if(!!curpaientinfo){
				this.props.dispatch(getevaluatebardenlist_request({query:{userpatientid:curpaientinfo._id}}));
				this.props.dispatch(getevaluatenursingmeasureslist_request({query:{userpatientid:curpaientinfo._id}}));
				this.props.dispatch(getevaluatewoundsurfacelist_request({query:{userpatientid:curpaientinfo._id}}));
			}

			if(!!cursmartdevice){
				this.props.dispatch(subscribedevice_request({smartdeviceid:cursmartdevice._id,subscribeflag:true}));
			}
		}

		componentWillUnmount() {
			const {cursmartdevice} = this.props;
			if(!!cursmartdevice){
				this.props.dispatch(subscribedevice_request({smartdeviceid:cursmartdevice._id,subscribeflag:false}));
			}
		}

		changePage = (btnkey)=>{
			defaultbtnkey = btnkey;
		}

  	render() {
			const {curpaientinfo,cursmartdevice,db} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			let btnz = [];
			const btninfoz = [
				{
					btnkey:'btnbd',
					title:'Barden评估',
					visible:true,
					enabled:true,
					Co:<InfoBarden curpaientinfo={curpaientinfo} />
				},
				{
					btnkey:'btnws',
					title:'创面评估',
					visible:true,
					enabled:true,
					Co:<InfoWoundsurface curpaientinfo={curpaientinfo} />
				},
				{
					btnkey:'btnnm',
					title:'护理措施',
					visible:true,
					enabled:true,
					Co:<InfoNursingmeasures curpaientinfo={curpaientinfo} />
				},
				{
					btnkey:'btnls',
					title:'转归与申报',
					visible:true,
					enabled:true,
					Co:<InfoLapsetto curpaientinfo={curpaientinfo} db={db}/>
				},
				{
					btnkey:'btnto',
					title:'翻身治疗',
					visible:true,
					enabled:true,
					Co:<InfoSmartdevice curpaientinfo={curpaientinfo} cursmartdevice={cursmartdevice} />
				},

			];

			lodashmap(btninfoz,(btninfo)=>{
					btnz.push({
						btnkey:btninfo['btnkey'],
						title:btninfo['title'],
						enabled:btninfo['enabled'],
						visible:btninfo['visible'],
						Co:btninfo['Co']
					});
			});

			if(!curpaientinfo.firstevaluatebardenid){
				//没有首次Barden评估,仅显示第一个按钮
				lodashmap(btnz,(info,index)=>{
					if(index > 0){
						info.visible = false;
					}
				})
			}

			if(!curpaientinfo.firstevaluatewoundsurfaceid){
				//如果病人是高危，则必须填写
				if(curpaientinfo.Diseaseclassification === '压疮高危'){
					lodashmap(btnz,(info,index)=>{
						if(index > 1){
							info.visible = false;
						}
					});
				}
			}

			if(!curpaientinfo.firstevaluatenursingmeasuresid){
				//没有首次护理措施评估,不显示转归申报
				lodashmap(btnz,(info,index)=>{
					if(index === 2 || index === 3){
						info.visible = false;
					}
				});
			}

			if(!cursmartdevice){
				btnz[btnz.length - 1].visible = false;
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
							</div>
							<div className="tabcontent">
								<Tabs onChange={this.changePage} type="card" defaultActiveKey={defaultbtnkey}>
								{
									lodashmap(btnz,(btninfo,index)=>{
										if(btninfo.visible){
											return (
												<TabPane tab={btninfo.title} key={btninfo.btnkey}>
														 <div className="record">
															 {btninfo.Co}
														 </div>
												</TabPane>);
										}
									})
								}
								</Tabs>
							</div>

						</div>

					</Layout>

			);
  	}
}

const mapStateToProps = ({db},props) => {
		const {paientinfos,beds,smartdevices} = db;
		const id = lodashget(props,'match.params.pid');
		let curpaientinfo = paientinfos[id];
		let cursmartdevice;
		if(!!curpaientinfo){
			const curbed = beds[curpaientinfo.bedid];
			if(!!curbed){
				const smartdeviceid = curbed.smartdeviceid;
				cursmartdevice = smartdevices[smartdeviceid];
			}
		}
    return {curpaientinfo,cursmartdevice,db};
}
export default connect(mapStateToProps)(App);
