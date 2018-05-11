import React from 'react';
import { connect } from 'react-redux';
import lodashget from 'lodash.get';
import ContentTitleBar from '../patientinfo/patientinfo_content_titlebar';
import PageForm from './form_lapseto_barden';
import {getdefaultlapseto_barden} from '../../util';
import {createformreviewlapseto_request,editformreviewlapseto_request} from '../../actions';



class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onClickSubmit = (values)=>{
			console.log(values);
			const {curpaientinfo,isnew,curformreviewlapseto} = this.props;
			if(isnew){
				values.userpatientid = curpaientinfo._id;
				this.props.dispatch(createformreviewlapseto_request(values));
			}
			else{
				let newcurformreviewlapseto = {...curformreviewlapseto,...values};
				this.props.dispatch(editformreviewlapseto_request(newcurformreviewlapseto));
			}

			console.log(values);
		}
  	render() {
			const {curpaientinfo,db,curformreviewlapseto,isnew} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			let formname = 'NewLapsetoForm';
			let formvalues = getdefaultlapseto_barden(16);
			if(!isnew){
				formvalues = curformreviewlapseto;
			}
	    return (
	      	<div>
						<ContentTitleBar title="转归与申报记录" titleNew="转归填写" titleView="打印报表"
							onClickNew={this.onClickNew} onClickViewPrint={this.onClickViewPrint} />

						<PageForm onClickSubmit={this.onClickSubmit}
							formname={formname}
							formvalues={formvalues}/>
	      	</div>
	    );
  	}
}


const mapStateToProps = ({db},props) => {
		let curpaientinfo = props.curpaientinfo;
		const {formreviewlapsetos} = db;
		let isnew = true;
		let curformreviewlapseto;
		if(!!curpaientinfo.formreviewlapsetoid){
			curformreviewlapseto = formreviewlapsetos[curpaientinfo.formreviewlapsetoid];
			if(!!curformreviewlapseto){
				isnew = false;
			}
		}
		return {curpaientinfo,isnew,curformreviewlapseto,db};
}
export default connect(mapStateToProps)(App);
