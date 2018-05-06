import React from 'react';
import { connect } from 'react-redux';
// import { Button } from 'antd';
import lodashget from 'lodash.get';
import { Layout } from 'antd';
// import moment from 'moment';
import ViewPrintHeader from './viewprint_header';
import RecordbardenTableBody from './recordbarden_tablebody';

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
									<RecordbardenTableBody evaluatebardenlist={evaluatebardenlist} />
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
