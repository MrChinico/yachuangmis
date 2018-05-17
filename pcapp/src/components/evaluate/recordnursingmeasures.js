import React from 'react';
import { connect } from 'react-redux';
import ViewPrintHeader from './viewprint_header';

import RecordNursingMeasuresTableBody from './recordnursingmeasures_tablebody.js';
import lodashget from 'lodash.get';
import { Layout } from 'antd';
import ViewPrintTitltToPrint from './viewprint_title_toprint';

const { Header } = Layout;

class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
			const {curpaientinfo,db,evaluatenursingmeasureslist,app} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			const {Hospitalname} = app;
	    return (
				<Layout>
					<Header>
						<span><img src="index.png" className="icon-index" alt=""/>护理措施</span>
					</Header>
					<div className="content-box">
						<div className="content assess">
							<ViewPrintTitltToPrint title="护理措施查看" refnode={() => this.componentRef} history={this.props.history}/>

							<form ref={el => (this.componentRef = el)}>
								<div className="form-box">
									<h1>{Hospitalname}护理措施表</h1>
									<ViewPrintHeader curpaientinfo={curpaientinfo} db={db} />
									<RecordNursingMeasuresTableBody db={db} evaluatenursingmeasureslist={evaluatenursingmeasureslist}/>
								</div>
							</form>
						</div>
					</div>
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
