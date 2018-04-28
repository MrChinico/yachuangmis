import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import lodashget from 'lodash.get';
import { Layout } from 'antd';
const { Header } = Layout;
class App extends React.Component {


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
						<span><img src="index.png" className="icon-index" alt=""/>查看打印护理措施表单</span>
					</Header>
					<div className="content-box">
						<div className="content assess">
							<h1 className="printing-title">压疮护理措施记录查看
								<button className="ant-btn">
									<img src="printing.png" alt="" />打印报表
								</button>
								<button className="return" onClick={
									()=>{
										this.props.history.goBack();
									}
								}><img src="return.png" alt=""/></button>
								<div className="clearfix"></div>
							</h1>
							<form>
								<div className="form-box">
									<h1>某某市某某医院压疮护理措施表</h1>
									<table className="patient-info">
										<tbody>
											<tr className="elastic">
												<td>姓名：<input type="text"/></td>
												<td>性别：<input type="text"/></td>
												<td>年龄：<input type="text"/></td>
												<td>住院号：<input type="text"/></td>
											</tr>
											<tr className="elastic">
												<td>科室：<input type="text"/></td>
												<td className="w-50">入院日期：
													<input type="text" />年
													<input type="text" />月
													<input type="text" />日
													<input type="text" />:<input type="text" />
												</td>
												<td>床号：<input type="text" /></td>
											</tr>
										</tbody>
									</table>

									<table width="100%" className="nursing-record white-bg">
                                      <tr>
                                        <td colspan="2" rowspan="2">请在采取的护理措施项目内打“<font className="blue fontSize18 font-weight">√</font>”</td>
                                        <td colspan="4"><div align="center">护理日期</div></td>
                                      </tr>
                                      <tr className="date">
                                        <td><div align="center"><img src="arrow-left-green.png" />4月11日</div></td>
                                        <td><div align="center">4月10日</div></td>
                                        <td><div align="center">4月9日</div></td>
                                        <td><div align="center">4月8日<img src="arrow-right-green.png" className="right" /></div></td>
                                      </tr>
                                      <tr>
                                        <td rowspan="4" className="white-bg">全身治疗</td>
                                        <td>1、积极治疗</td>
                                        <td align="center"><font className="blue fontSize18 font-weight">√</font></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td>2、积极治疗</td>
                                        <td align="center"><font className="blue fontSize18 font-weight">√</font></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td>3、积极治疗</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td>4、积极治疗</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td rowspan="3" className="white-bg">体位与活动</td>
                                        <td>1、积极治疗</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td>2、积极治疗</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td>3、积极治疗</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td rowspan="5" className="white-bg">敷料使用</td>
                                        <td>1</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td>3</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td>4</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td>5</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td rowspan="4" className="white-bg">患者家属健康教育</td>
                                        <td>1</td>
										<td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td>2</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td>3</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td>4</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td colspan="2" className="white-bg">其他</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td colspan="2">护士签名
											<input type="text" />
										</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td colspan="2">护士长签名
											<input type="text" />
										</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                    </table>
								</div>
							</form>
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
