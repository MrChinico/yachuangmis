import React from 'react';
import { connect } from 'react-redux';
// import ViewPrintHeader from './viewprint_header';

import RecordNursingMeasuresTableBody from './recordnursingmeasures_tablebody.js';
import lodashget from 'lodash.get';
import { Layout } from 'antd';
import ViewPrintTitltToPrint from './viewprint_title_toprint';

import moment     from 'moment'

const { Header } = Layout;

class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
			const
				{curpaientinfo,db,evaluatenursingmeasureslist,app} = this.props,
				{ depats, beds }      = db,
				Bedname               = lodashget( beds, `${curpaientinfo.bedid}.Bedname`, '' ),
				Depatname             = lodashget( depats, `${curpaientinfo.depatid}.Depatname` , '' ),
				momentin              = moment( curpaientinfo.In_date );

			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			const {Hospitalname} = app;
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
								<RecordNursingMeasuresTableBody db={db} evaluatenursingmeasureslist={evaluatenursingmeasureslist}/>
							</div>
						</div>
					</form>
				</Layout>
	    );
  	}
}


const mapStateToProps = ({db,evaluatenursingmeasures,app},props) => {
		const {paientinfos} = db;
		const {evaluatenursingmeasureslist} = evaluatenursingmeasures;
		const id = lodashget(props,'match.params.pid');
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo,db,evaluatenursingmeasureslist,app};
}
export default connect(mapStateToProps)(App);
