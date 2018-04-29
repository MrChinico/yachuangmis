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
			this.props.dispatch(getevaluatebardenlist_request({}));
		}

		componentWillUnmount() {

		}

		changePage = (index)=>{
			this.setState({btnindex:index});
		}

  	render() {
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			const {btnindex} = this.state;
			let btnz = [];
			const btnisenabled = [true,true,true,true,true];
			const btntitle = ['Barden评估','创面评估','护理措施','转归与申报','翻身治疗']
			for(let i = 0 ;i < 5 ; i++){
				if(i === btnindex){
					btnz.push({
						clsname:'on',
						title:btntitle[i],
						isenabled:btnisenabled[i]
					});
				}
				else{
					btnz.push({
						clsname:'off',
						title:btntitle[i],
						isenabled:btnisenabled[i]
					});
				}
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
										this.props.history.goBack();
									}
								}><img src="return.png" alt=""/></button>
								<div className="clearfix"></div>
							</h2>
							<TitleDetail curpaientinfo={curpaientinfo} />
							<div className="assess-btn-box">
								{
									lodashmap(btnz,(btninfo,index)=>{
										return (<div className="assess-btn" key={index}>
										<Button className={btninfo.clsname} onClick={
											()=>{
												if(btninfo.isenabled){
													this.changePage(index);
												}
											}
										}>{btninfo.title}</Button>
										</div>)
									})
								}
							</div>
							</div>

								<div className="record">
									{this.state.btnindex === 0 && <InfoBarden curpaientinfo={curpaientinfo} />}
									{this.state.btnindex === 1 && <InfoWoundsurface curpaientinfo={curpaientinfo} />}
									{this.state.btnindex === 2 && <InfoNursingmeasures curpaientinfo={curpaientinfo} />}
									{this.state.btnindex === 3 && <InfoLapsetto curpaientinfo={curpaientinfo} />}
									{this.state.btnindex === 4 && <InfoSmartdevice curpaientinfo={curpaientinfo} />}
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
