import React from 'react';
import { connect } from 'react-redux';
import { Layout,Button } from 'antd';
import lodashget from 'lodash.get';
import TitleDetail from '../patientinfo/patientinfo_content_title_detail';
import NewbardenForm from './form_newbarden';

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
						<span><img src="index.png" className="icon-index" alt=""/>新建／编辑Barden表单</span>
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
							<h3>压疮风险评估表</h3>
							<div className="wound-surface-form">
								<table>
									<tr>
										<td className="black font-weight">项目</td>
										<td>1分</td>
										<td>2分</td>
										<td>3分</td>
										<td>4分</td>
									</tr>
									<tr>
										<td className="black font-weight">感觉</td>
										<td>完全受限</td>
										<td className="blue">-非常受限-</td>
										<td>轻度受限</td>
										<td>未受损害</td>
									</tr>
									<tr>
										<td className="black font-weight">潮湿</td>
										<td>完全受限</td>
										<td className="blue">-非常受限-</td>
										<td>轻度受限</td>
										<td>未受损害</td>
									</tr>
									<tr>
										<td className="black font-weight">活动力</td>
										<td>完全受限</td>
										<td className="blue">-非常受限-</td>
										<td>轻度受限</td>
										<td>未受损害</td>
									</tr>
									<tr>
										<td className="black font-weight">移动力</td>
										<td>完全受限</td>
										<td className="blue">-非常受限-</td>
										<td>轻度受限</td>
										<td>未受损害</td>
									</tr>
									<tr>
										<td className="black font-weight">营养</td>
										<td>完全受限</td>
										<td className="blue">-非常受限-</td>
										<td>轻度受限</td>
										<td>未受损害</td>
									</tr>
									<tr>
										<td className="black font-weight">摩擦力和剪切力</td>
										<td>完全受限</td>
										<td className="blue">-非常受限-</td>
										<td colspan="2">无明显问题</td>
									</tr>
								</table>
							</div>
						</div>
						<div className="mt40 text-center">
							<p class="black fontSize18">得分：<span className="blue">16分</span></p>
							<p class="blue fontSize14">轻度危险！</p>
						</div>
						<TitleDetail curpaientinfo={curpaientinfo} />
						<NewbardenForm onClickSubmit={this.onClickSubmit}/>

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
