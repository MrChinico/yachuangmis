import React from 'react';
import { connect } from 'react-redux';
import ContentTitleBar from '../patientinfo/patientinfo_content_titlebar';


import PageForm from './form_lapseto';
class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onClickNew = ()=>{
			const {curpaientinfo} = this.props;
			// this.props.history.push(`/newnursingmeasures/${curpaientinfo._id}/0`);
		}
		onClickViewPrint = ()=>{
			const {curpaientinfo} = this.props;
			// this.props.history.push(`/viewprintrecordnursingmeasures/${curpaientinfo._id}`);
		}
		onClickSubmit = (values)=>{
			console.log(values);
		}
  	render() {
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
	    return (
	      	<div>
						<ContentTitleBar title="转归与申报记录" titleNew="转归填写" titleView="打印报表"
							onClickNew={this.onClickNew} onClickViewPrint={this.onClickViewPrint} />

						<PageForm onClickSubmit={this.onClickSubmit}/>
	      	</div>
	    );
  	}
}


export default connect()(App);
