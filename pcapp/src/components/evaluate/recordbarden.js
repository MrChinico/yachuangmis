import React from 'react';
import { connect } from 'react-redux';
// import { Button } from 'antd';
import lodashget from 'lodash.get';
import { Layout } from 'antd';
import ViewPrintTitltToPrint from './viewprint_title_toprint';

import ViewPrintHeader from './viewprint_header';
import RecordbardenTableBody from './recordbarden_tablebody';
import './form_tamplate_style.styl'
import moment     from 'moment'

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
			const
			{curpaientinfo,db,evaluatebardenlist,app, info} = this.props,
    	{ depats, beds }      = db,
			Bedname               = lodashget( beds, `${curpaientinfo.bedid}.Bedname`, '' ),
    	Depatname             = lodashget( depats, `${curpaientinfo.depatid}.Depatname` , '' ),
    	momentin              = moment( curpaientinfo.In_date );
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			const {Hospitalname} = app;
			console.log(this.props)
			
	    return (
			<Layout>
				<Header>
				 	<span><img src="index.png" className="icon-index" alt=""/>查看Bardenp评估</span>
				</Header>
				<ViewPrintTitltToPrint title="Barden评估打印" refnode={() => this.componentRef} history={this.props.history}/>
					<form ref={el => (this.componentRef = el)}>
					<div className = "form-page" >
      				<div className = "column">
								<div className = "form-header column">
									<div className = "form-title center-x">
										{ Hospitalname }压疮危险因素评估表
									</div>
									<div className = "form-abstract column">
										<div>
											<div className = "flex-1"><span>科室：</span><span>{ Depatname }</span></div>
											<div className = "flex-2 in-date">
												<span>入院日期：</span>
												<span>{ momentin.format('YYYY') }</span>年
												<span>{ momentin.format('MM') }</span>月
												<span>{ momentin.format('DD') }</span>日
												<span>{ momentin.format('HH') }</span>:
												<span>{ momentin.format('mm') }</span>
											</div>
											<div className = "flex-1"><span>床号：</span><span>{Bedname}</span></div>
										</div>
										<div>
											<div className = "flex-1"><span>姓名：</span><span>{ lodashget( curpaientinfo, 'Patientname', '' ) }</span></div>
											<div className = "flex-1"><span>性别：</span><span>{ lodashget( curpaientinfo, 'SexString', '男' ) }</span></div>
											<div className = "flex-1"><span>年龄：</span><span>{ lodashget( curpaientinfo, 'Age', '') }</span></div>
											<div className = "flex-1"><span>住院号：</span><span>{ lodashget( curpaientinfo, 'Patientno', '') }</span></div>
										</div>
									</div>
								</div>
								<RecordbardenTableBody evaluatebardenlist={evaluatebardenlist} db={db}/>
							</div>
						</div>
					</form>
			</Layout>
	    );
  	}
}


const mapStateToProps = ({db,evaluatebarden,app},props) => {
		const {paientinfos} = db;
		const {evaluatebardenlist} = evaluatebarden;
		const id = lodashget(props,'match.params.pid');
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo,db,evaluatebardenlist,app};
}
export default connect(mapStateToProps)(App);
