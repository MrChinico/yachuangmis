import React from 'react';
import { connect } from 'react-redux';
import ViewPrintHeader from './viewprint_header';
import lodashget from 'lodash.get';
import RecordwoundsurfaceTablebodyTitle from './recordwoundsurface_tablebody_title';

import { Layout } from 'antd';
const { Header } = Layout;
class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
			const {curpaientinfo,db} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
	    return (
				<Layout>
					<Header>
						<span><img src="index.png" className="icon-index" alt=""/>查看打印创面评估表单</span>
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
							<RecordwoundsurfaceTablebodyTitle />
							<div className="form-box">
								<h1>某某市某某医院危险因素评估</h1>
								<ViewPrintHeader curpaientinfo={curpaientinfo} db={db} />

								<table width="100%" className="nursing-record white-bg">
									<tr>
										<td colspan="" rowspan="2">创面</td>
										<td colspan="" rowspan="2">创面大小</td>
										<td colspan="" rowspan="2">项目指标</td>
										<td colspan="4"><div align="center">评估日期</div></td>
									</tr>
									<tr className="date">
										<td><div align="center"><img src="arrow-left-green.png" />4月11日</div></td>
										<td><div align="center">4月10日</div></td>
										<td><div align="center">4月9日</div></td>
										<td><div align="center">4月8日<img src="arrow-right-green.png" className="right" /></div></td>
									</tr>
									<tr>
										<td rowspan="9" className="white-bg">创面一</td>
										<td colspan="2" align="center">分期</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td colspan="2" align="center">部位</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td rowspan="7">创面大小</td>
										<td align="center">长cm</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td align="center">宽cm</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td align="center">深cm</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td align="center">潜行</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td align="center">窦道</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td align="center">颜色</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td align="center">渗液量</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td rowspan="9" className="white-bg">创面二</td>
										<td colspan="2" align="center">分期</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td colspan="2" align="center">部位</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td rowspan="7">创面大小</td>
										<td align="center">长cm</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td align="center">宽cm</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td align="center">深cm</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td align="center">潜行</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td align="center">窦道</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td align="center">颜色</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td align="center">渗液量</td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
										<td align="center"></td>
									</tr>
									<tr>
										<td colspan="3" className="white-bg">评估人
										<input type="text" />
										</td>
										<td align="center" className="white-bg"></td>
										<td align="center" className="white-bg"></td>
										<td align="center" className="white-bg"></td>
										<td align="center" className="white-bg"></td>
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


const mapStateToProps = ({db},props) => {
		const {paientinfos} = db;
		const id = lodashget(props,'match.params.pid');
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo,db};
}
export default connect(mapStateToProps)(App);
