import React from 'react';
import { connect } from 'react-redux';
import ViewPrintHeader from './viewprint_header';
import lodashget from 'lodash.get';
import RecordwoundsurfaceTablebody from './recordwoundsurface_tablebody';

import { Layout } from 'antd';
const { Header } = Layout;
class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
			const {curpaientinfo,db,evaluatewoundsurfacelist} = this.props;
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
							<div className="form-box">
								<h1>某某市某某医院危险因素评估</h1>
								<ViewPrintHeader curpaientinfo={curpaientinfo} db={db} />
								<RecordwoundsurfaceTablebody evaluatewoundsurfacelist={evaluatewoundsurfacelist} db={db} />
								
								</div>
						</form>
					</div>
					</div>
					</Layout>
	    );
  	}
}


const mapStateToProps = ({db,evaluatewoundsurface},props) => {
		const {paientinfos} = db;
		const id = lodashget(props,'match.params.pid');
		const {evaluatewoundsurfacelist} = evaluatewoundsurface;
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo,db,evaluatewoundsurfacelist};
}
export default connect(mapStateToProps)(App);
