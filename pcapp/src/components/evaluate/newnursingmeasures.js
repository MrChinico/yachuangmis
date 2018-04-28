import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import lodashget from 'lodash.get';
import TitleDetail from '../patientinfo/patientinfo_content_title_detail';
import NewnursingmeasuresForm from './form_newnursingmeasures';

const { Header } = Layout;


class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickSubmit =(values)=>{
			this.props.history.goBack();
		}
  	render() {
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
	    return (
				<Layout>
					<Header>
						<span><img src="index.png" className="icon-index" alt=""/>新建／编辑护理措施表单</span>
					</Header>
					<div className="content-box">
					<div className="content assess">
						<h2>21206<span>张三丰</span>
							<button className="return" onClick={
								()=>{
									this.props.history.goBack();
								}
							}><img src="return.png" alt=""/></button>
							<div className="clearfix"></div>
						</h2>
						<div className="wound-surface">
							<div className="wound-surface-form">
								<table>
									<tr>
										<td className="black font-weight">全面治疗</td>
										<td className="blue">-积极治疗原发病-</td>
										<td>-增加营养-</td>
										<td>-三期-</td>
										<td>四期</td>
										<td>可疑深部组织损伤</td>
										<td colspan="2">不能分期</td>
									</tr>
									<tr>
										<td className="black font-weight">体位与活动</td>
										<td>-建立翻身卡-</td>
										<td className="blue">-定期翻身-</td>
									</tr>
									<tr>
										<td className="black font-weight">皮肤护理</td>
										<td>（左）<span className="blue">耳廓（右）</span></td>
										<td>（左）耳廓（右）</td>
										<td>鼻梁</td>
										<td>棘突</td>
										<td>（左）肩峰（右）</td>
										<td colspan="2">（左）肩胛部（右）</td>
									</tr>
								</table>
							</div>
						</div>
						<div className="mt40">
							<button class="ant-btn-edit blue white">提交措施</button>
						</div>
						<TitleDetail curpaientinfo={curpaientinfo} />
						<NewnursingmeasuresForm onClickSubmit={this.onClickSubmit}/>
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
