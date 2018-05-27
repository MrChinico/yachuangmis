import React from 'react';
import { connect } from 'react-redux';
import ViewPrintHeader from './viewprint_header';
import lodashget from 'lodash.get';
import RecordwoundsurfaceTablebody from './recordwoundsurface_tablebody';
import ViewPrintTitltToPrint from './viewprint_title_toprint';

import { Layout } from 'antd';
const { Header } = Layout;
class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
			const {curpaientinfo,db,evaluatewoundsurfacelist,app} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			const {Hospitalname} = app;
	    return (
				<Layout>
					<Header>
						<span><img src="index.png" className="icon-index" alt=""/>创面评估</span>
					</Header>
					<div className="content-box">
					<div className="content assess">
						<ViewPrintTitltToPrint title="疮面打印" refnode={() => this.componentRef} history={this.props.history}/>
						<form ref={el => (this.componentRef = el)}>
							<div style={{
								width: '100%',
						    margin: '20px auto',
						    color: '#333',
						    background: '#f9f9f9',
						    border:'1px solid #ddd',
							}}>
								<h1 style={{
									color:'#111',
									fontSize: '20px',
									textAlign: 'center',
									lineHeight:'70px',
								}}>{Hospitalname}压疮疮面评估</h1>
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


const mapStateToProps = ({db,evaluatewoundsurface,app},props) => {
		const {paientinfos} = db;
		const id = lodashget(props,'match.params.pid');
		const {evaluatewoundsurfacelist} = evaluatewoundsurface;
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo,db,evaluatewoundsurfacelist,app};
}
export default connect(mapStateToProps)(App);
