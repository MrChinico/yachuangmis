import React from 'react';
import { connect } from 'react-redux';
// import { Button } from 'antd';
import lodashget from 'lodash.get';
import { Layout } from 'antd';
import ViewPrintTitltToPrint from './viewprint_title_toprint';

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
			const {curpaientinfo,db,evaluatebardenlist,app} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			const {Hospitalname} = app;
	    return (
				<Layout>
					<Header>
						<span><img src="index.png" className="icon-index" alt=""/>查看Bardenp评估</span>
					</Header>
					<div className="content-box">
					<div className="content assess">
						<ViewPrintTitltToPrint title="Barden评估打印" refnode={() => this.componentRef} history={this.props.history}/>
						<form ref={el => (this.componentRef = el)}>
								<div className="form-box">
									<h1>{Hospitalname}压疮危险因素评估表</h1>
									<ViewPrintHeader curpaientinfo={curpaientinfo} db={db} />
									<RecordbardenTableBody evaluatebardenlist={evaluatebardenlist} db={db}/>
								</div>
							</form>
					</div>
					</div>
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
