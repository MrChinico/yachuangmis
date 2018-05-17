import React from 'react';
import { connect } from 'react-redux';
// import lodashget from 'lodash.get';
import ContentTitleBar from '../patientinfo/patientinfo_content_titlebar';
// import PageForm from './form_lapseto_barden';
// import {getdefaultlapseto_barden} from '../../util';
import {createformreviewlapseto_request,editformreviewlapseto_request} from '../../actions';
import ReviewDetailInfo from './lapseto_viewinfo';
import InfoNorecords from '../patientinfo/info_norecords';


class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onClickNew = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/newlapseto/${curpaientinfo._id}/0`);
		}
		onClickViewPrint = ()=>{
			// const {curpaientinfo} = this.props;
			// this.props.history.push(`/viewprintrecordbarden/${curpaientinfo._id}`);
		}
		// onClickEdit =(record)=>{
		// 	const {curpaientinfo} = this.props;
		// 	this.props.history.push(`/newbarden/${curpaientinfo._id}/${record._id}`);
		// }

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
			const {curpaientinfo,curformreviewlapseto,isnew} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			if(isnew){
				return (<InfoNorecords btnTitle="转归填写" onClickNew={this.onClickNew} />);
			}
	    return (
	      	<div>
						<ContentTitleBar title="转归与申报记录" titleNew="编辑审阅转归单" titleView="打印报表"
							onClickNew={this.onClickNew}  />

						{!!curformreviewlapseto && <ReviewDetailInfo info={curformreviewlapseto} /> }
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
