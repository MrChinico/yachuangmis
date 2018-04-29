import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ContentTitleBar from './patientinfo_content_titlebar';
import PTable from './table';



class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickNew = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/newbarden/${curpaientinfo._id}/0`);
		}
		onClickViewPrint = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/viewprintrecordbarden/${curpaientinfo._id}`);
		}
		onClickEdit =(record)=>{

		}
  	render() {
			const {curpaientinfo,evaluatebardenlist,evaluatebardens} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			let allrecords = [];
			for(let i = 0 ;i <  evaluatebardenlist.length; i ++){
				const record = evaluatebardens[evaluatebardenlist[i]];
				allrecords.push(record);
			}
			const fieldnames = ['created_at','usercreatorid','score'];
	    return (
	      	<div>
						<ContentTitleBar title="Barden评估记录" titleNew="新建评估" titleView="查看&打印"
							onClickNew={this.onClickNew} onClickViewPrint={this.onClickViewPrint} />
						<PTable allrecords={allrecords} fieldnames={fieldnames} onClickEdit={this.onClickEdit} />
	      	</div>
	    );
  	}
}

const mapStateToProps = ({evaluatebarden},props) => {
		const {evaluatebardenlist,evaluatebardens} = evaluatebarden;
    return {evaluatebardenlist,evaluatebardens};
}
App = withRouter(App);
export default connect(mapStateToProps)(App);
