import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ContentTitleBar from './patientinfo_content_titlebar';
import PTable from './table';
import lodashget from 'lodash.get';


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
			const {curpaientinfo} = this.props;
			this.props.history.push(`/newbarden/${curpaientinfo._id}/${record._id}`);
		}

		renderTableRecord = (record)=>{
			const {users} = this.props;
			if(!!record){
				return [
					<span key={0}>{lodashget(record,'created_at','')}</span>,
					<span key={1}>评估护士:{lodashget(users[record.usercreatorid],'username','')}</span>,
					<span key={2}>评估分数:{lodashget(record,'score','')}</span>,
					<span key={3} onClick={()=>{this.onClickEdit(record);}}>详情</span>
				];
			}
			return [];
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

	    return (
	      	<div>
						<ContentTitleBar title="Barden评估记录" titleNew="新建评估" titleView="查看&打印"
							onClickNew={this.onClickNew} onClickViewPrint={this.onClickViewPrint} />
						<PTable allrecords={allrecords} renderTableRecord={this.renderTableRecord} pagenumber={5}/>
	      	</div>
	    );
  	}
}

const mapStateToProps = ({evaluatebarden,db},props) => {
		const {evaluatebardenlist} = evaluatebarden;
		const {evaluatebardens,users} = db;
    return {evaluatebardenlist,evaluatebardens,users};
}
App = withRouter(App);
export default connect(mapStateToProps)(App);
