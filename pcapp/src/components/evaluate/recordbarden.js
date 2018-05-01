import React from 'react';
import { connect } from 'react-redux';
// import { Button } from 'antd';
import lodashget from 'lodash.get';
import { Layout } from 'antd';
import moment from 'moment';
import ViewPrintHeader from './viewprint_header';
const { Header } = Layout;
class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickSubmit =(values)=>{
			console.log(values);
			this.props.history.goBack();
		}
  	render() {
			const {curpaientinfo,db,evaluatebardenlist} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}

	    return (
				<Layout>
					<Header>
						<span><img src="index.png" className="icon-index" alt=""/>查看打印Barden表单</span>
					</Header>
					<div className="content-box">
					<div className="content assess">
						<h1 className="printing-title">Barden压疮评估记录查看
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
									<h1>某某医院压疮危险因素评估表</h1>
									<ViewPrintHeader curpaientinfo={curpaientinfo} db={db} />

									<table width="100%" className="nursing-record white-bg">
                                      <tr>
                                        <td colspan="" rowspan="2">项目</td>
                                        <td colspan="" rowspan="2">具体指标</td>
                                        <td colspan="" rowspan="2">评分数值</td>
                                        <td colspan="4"><div align="center">实际得分（按照评估日期填写）</div></td>
                                      </tr>
                                      <tr className="date">
                                        <td><div align="center"><img src="arrow-left-green.png" alt=""/>4月11日</div></td>
                                        <td><div align="center">4月10日</div></td>
                                        <td><div align="center">4月9日</div></td>
                                        <td><div align="center">4月8日<img src="arrow-right-green.png" className="right" alt=""/></div></td>
                                      </tr>
                                      <tr>
                                        <td rowspan="4" className="white-bg">感觉</td>
                                        <td align="center">无受损</td>
                                        <td align="center">4</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">轻微受损</td>
                                        <td align="center">3</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">非常受损</td>
                                        <td align="center">2</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">完全受损</td>
                                        <td align="center">1</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td rowspan="4" className="white-bg">潮湿</td>
                                        <td align="center">很少潮湿</td>
                                        <td align="center">4</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">偶尔潮湿</td>
                                        <td align="center">3</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">经常潮湿</td>
                                        <td align="center">2</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">持续潮湿</td>
                                        <td align="center">1</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td rowspan="4" className="white-bg">行走</td>
                                        <td align="center">经常行走</td>
                                        <td align="center">4</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">偶尔行走</td>
                                        <td align="center">3</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">坐位</td>
                                        <td align="center">2</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">卧床</td>
                                        <td align="center">1</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td rowspan="4" className="white-bg">移动</td>
                                        <td align="center">经常行走</td>
                                        <td align="center">4</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">偶尔行走</td>
                                        <td align="center">3</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">坐位</td>
                                        <td align="center">2</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">卧床</td>
                                        <td align="center">1</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td rowspan="4" className="white-bg">营养</td>
                                        <td align="center">经常行走</td>
                                        <td align="center">4</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">偶尔行走</td>
                                        <td align="center">3</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">坐位</td>
                                        <td align="center">2</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">卧床</td>
                                        <td align="center">1</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td rowspan="4" className="white-bg">摩擦力和剪切力</td>
                                        <td align="center">无明显问题</td>
                                        <td align="center">3</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">潜在问题</td>
                                        <td align="center">2</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td align="center">有问题</td>
                                        <td align="center">1</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td colspan="2" className="white-bg">总得分</td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                        <td align="center"></td>
                                      </tr>
                                      <tr>
                                        <td colspan="2">评估护士签名
											<input type="text" />
										</td>
                                        <td align="center"></td>
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


const mapStateToProps = ({db,evaluatebarden},props) => {
		const {paientinfos} = db;
		const {evaluatebardenlist} = evaluatebarden;
		const id = lodashget(props,'match.params.pid');
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo,db,evaluatebardenlist};
}
export default connect(mapStateToProps)(App);
