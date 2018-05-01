import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PTable from './table';
import ContentTitleBar from './patientinfo_content_titlebar';


class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickNew = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/newwoundsurface/${curpaientinfo._id}/0`);
		}
		onClickViewPrint = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/viewprintrecordwoundsurface/${curpaientinfo._id}`);
		}
		onClickEdit =(record)=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/newwoundsurface/${curpaientinfo._id}/${record._id}`);
		}
  	render() {
			const {curpaientinfo,evaluatewoundsurfacelist,evaluatewoundsurfaces} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			let allrecords = [];
			for(let i = 0 ;i <  evaluatewoundsurfacelist.length; i ++){
				const record = evaluatewoundsurfaces[evaluatewoundsurfacelist[i]];
				allrecords.push(record);
			}
			const fieldnames = ['created_at','usercreatorid','score'];
	    return (
	      	<div>
						<ContentTitleBar title="创面评估记录" titleNew="新建评估" titleView="查看&打印"
							onClickNew={this.onClickNew} onClickViewPrint={this.onClickViewPrint} />

						<PTable allrecords={allrecords} fieldnames={fieldnames} onClickEdit={this.onClickEdit} />
	      	</div>
	    );
  	}
}
const mapStateToProps = ({evaluatewoundsurface,db},props) => {
		const {evaluatewoundsurfacelist} = evaluatewoundsurface;
		const {evaluatewoundsurfaces} = db;
    return {evaluatewoundsurfacelist,evaluatewoundsurfaces};
}
App = withRouter(App);
export default connect(mapStateToProps)(App);
