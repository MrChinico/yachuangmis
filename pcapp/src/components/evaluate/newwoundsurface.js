import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import lodashget from 'lodash.get';
import TitleDetail from '../patientinfo/patientinfo_content_title_detail';
import NewwoundsurfaceForm from './form_newwoundsurface';

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
						<span><img src="index.png" className="icon-index" alt=""/>新建／编辑创面评估表单</span>
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
								<h4><span>创面1</span>
									<button className="return"><img src="close-blue.png" alt=""/></button>
									<div className="clearfix"></div>
								</h4>
								<div className="wound-surface-form">
									<table>
										<tr>
											<td className="black font-weight">项目</td>
											<td>一期</td>
											<td>二期</td>
											<td>-三期-</td>
											<td>四期</td>
											<td>可疑深部组织损伤</td>
											<td colspan="2">不能分期</td>
										</tr>
										<tr>
											<td className="black font-weight">部位</td>
											<td>枕部</td>
											<td>（左）耳廓（右）</td>
											<td>鼻梁</td>
											<td>棘突</td>
											<td>（左）肩峰（右）</td>
											<td colspan="2">（左）肩胛部（右）</td>
										</tr>
										<tr>
											<td className="black font-weight"></td>
											<td>（左）<span className="blue">耳廓（右）</span></td>
											<td>（左）耳廓（右）</td>
											<td>鼻梁</td>
											<td>棘突</td>
											<td>（左）肩峰（右）</td>
											<td colspan="2">（左）肩胛部（右）</td>
										</tr>
										<tr>
											<td className="black font-weight"></td>
											<td>枕部</td>
											<td>足跟</td>
											<td>足趾</td>
										</tr>
										<tr>
											<td className="black font-weight">大小</td>
											<td>长：<input type="text" />cm</td>
											<td>宽：<input type="text" />cm</td>
											<td>深：<input type="text" />cm</td>
											<td>潜行：<input type="text" /></td>
											<td>窦道：<input type="text" /></td>
											<td>颜色：<input type="text" /></td>
											<td>渗液量：<input type="text" /></td>
										</tr>
									</table>
								</div>
								<button className="add-btn"><img src="add-blue.png" alt="" />添加新创面</button>
							</div>
							<div className="mt40">
								<button class="ant-btn-edit blue white">提交评估</button>
							</div>
							
							<TitleDetail curpaientinfo={curpaientinfo} />
							<NewwoundsurfaceForm onClickSubmit={this.onClickSubmit}/>
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
