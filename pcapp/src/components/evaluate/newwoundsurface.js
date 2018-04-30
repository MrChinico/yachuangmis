import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import lodashget from 'lodash.get';
import TitleDetail from '../patientinfo/patientinfo_content_title_detail';
import NewwoundsurfaceForm from './form_newwoundsurface';
import {createevaluatewoundsurface_request,editevaluatewoundsurface_request} from '../../actions';

const { Header } = Layout;
class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickSubmit =(values)=>{
			const {curpaientinfo,isnew,curevaluatewoundsurface} = this.props;
			if(isnew){
				values.userpatientid = curpaientinfo._id;
				this.props.dispatch(createevaluatewoundsurface_request(values));
			}
			else{
				let newcurevaluatewoundsurface = {...curevaluatewoundsurface,...values};
				this.props.dispatch(editevaluatewoundsurface_request(newcurevaluatewoundsurface));
			}

			console.log(values);
			// this.props.history.goBack();
		}
  	render() {
			const {curpaientinfo,isnew,curevaluatewoundsurface} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			let formname = 'NewWoundsurfaceForm';
			let formvalues = {evaluateWoundsurfaces:[]};
			if(!isnew){
				formvalues = curevaluatewoundsurface;
			}
			const title = isnew?'新建':'编辑';
	    return (
				<Layout>
					<Header>
						<span><img src="index.png" className="icon-index" alt=""/>{title}创面评估表单</span>
					</Header>
					<div className="content-box">
						<div className="content assess">
							<h2>{lodashget(curpaientinfo,'Patientno','')}<span>{lodashget(curpaientinfo,'Patientname','')}</span>
								<button className="return" onClick={
									()=>{
										this.props.history.goBack();
									}
								}><img src="return.png" alt=""/></button>
								<div className="clearfix"></div>
							</h2>

							<TitleDetail curpaientinfo={curpaientinfo} />
							<NewwoundsurfaceForm onClickSubmit={this.onClickSubmit}
								formname={formname}
								formvalues={formvalues}/>
						</div>
					</div>
	      	</Layout>
	    );
  	}
}


const mapStateToProps = ({paientinfo,evaluatewoundsurface},props) => {
		const {paientinfos} = paientinfo;
		const id = lodashget(props,'match.params.pid');
		const bardenid = lodashget(props,'match.params.id');
		let isnew = bardenid === '0';
		let curpaientinfo = paientinfos[id];
		if(isnew){
			return {curpaientinfo,isnew};
		}
		const {evaluatewoundsurfaces} = evaluatewoundsurface;
		const curevaluatewoundsurface = evaluatewoundsurfaces[bardenid];
		if(!curevaluatewoundsurface){
			isnew = true;
		}
		return {curpaientinfo,isnew,curevaluatewoundsurface};
}

export default connect(mapStateToProps)(App);
