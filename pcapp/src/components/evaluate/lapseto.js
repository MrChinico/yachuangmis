import React from 'react';
import { connect } from 'react-redux';
// import lodashget from 'lodash.get';
// import ContentTitleBar from '../patientinfo/patientinfo_content_titlebar';
// import PageForm from './form_lapseto_barden';
// import {getdefaultlapseto_barden} from '../../util';
import {createformreviewlapseto_request,editformreviewlapseto_request} from '../../actions';
import ReviewDetailInfo from './lapseto_viewinfo';
import InfoNorecords from '../patientinfo/info_norecords';
import ReactToPrint from "react-to-print";
import './lapseto.css';
import './lapseto.styl';


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
			const {curpaientinfo,isnew,curformreviewlapseto} = this.props;
			if(isnew){
				values.userpatientid = curpaientinfo._id;
				this.props.dispatch(createformreviewlapseto_request(values));
			}
			else{
				let newcurformreviewlapseto = {...curformreviewlapseto,...values};
				this.props.dispatch(editformreviewlapseto_request(newcurformreviewlapseto));
			}
		}
  	render() {
			const {curpaientinfo,curformreviewlapseto,isnew,db,Hospitalname,userlogin} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			if(isnew){
				return (<InfoNorecords btnTitle="转归填写" onClickNew={this.onClickNew} />);
			}
	    return (
	      	<div className="printing-title">
						<div className="lapseto">
					    <span>转归与申报记录</span>
					    <button
								onClick={ () => {
					              this.onClickNew();
					            }
					          } className="ant-btn"> <img src="add.png" alt=""/>
					          编辑审阅转归单</button>
							<ReactToPrint
								trigger={ () => 
									<span className="ant-btn"><img src="printing.png" alt="" />打印报表</span>
								}
								content={ () => this.componentRef }
							/>
							</div>
							<div className="table-frame" ref={el => (this.componentRef = el)}>
								<ReviewDetailInfo info={curformreviewlapseto} Hospitalname={Hospitalname} db={db} userlogin={userlogin}/>
							</div>


	      	</div>
	    );
  	}
}


const mapStateToProps = ({db,app,userlogin},props) => {
		let curpaientinfo = props.curpaientinfo;
		const {formreviewlapsetos} = db;
		const {Hospitalname} = app;
		let isnew = true;
		let curformreviewlapseto;
		if(!!curpaientinfo.formreviewlapsetoid){
			curformreviewlapseto = formreviewlapsetos[curpaientinfo.formreviewlapsetoid];
			if(!!curformreviewlapseto){
				isnew = false;
			}
		}
		return {curpaientinfo,isnew,curformreviewlapseto,db,userlogin,Hospitalname};
}
export default connect(mapStateToProps)(App);
