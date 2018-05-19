import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import {set_uiapp} from '../../actions';
import { Badge } from 'antd';
import lodashget from 'lodash.get';
const { Header } = Layout;
class App extends React.Component {
		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onClickSearch = ()=>{
			this.props.history.push(`/searchpaientinfo`);
		}
		onClickDatastat = ()=>{
			this.props.history.replace(`/datastat`);
		}
		onClickReview = ()=>{
			this.props.history.replace(`/review`);
		}
		onClickUser = ()=>{
			this.props.dispatch(set_uiapp({ispopuserinfo:true}));
		}

  	render() {
			const Depatname = lodashget(this,'props.userlogin.depatid.Depatname','');
			const PermissionName = lodashget(this,'props.userlogin.permission.name','');
			const truename = lodashget(this,'props.userlogin.Staffname','');
			const reviewnumber = lodashget(this,'props.userlogin.reviewnumber','');
			const btns = [
				<button key={'btnsearch'} onClick={
					()=>{
					this.onClickSearch()
				}}>搜索</button>,
				<button key={'btndata'} onClick={
					()=>{
						this.onClickDatastat();
					}
				}>数据统计</button>,
				<button key={'btnreview'} onClick={
					()=>{
					this.onClickReview()
				}}>
				<Badge count={reviewnumber} overflowCount={99}>
					<span style={{color:'white'}}>申报审阅&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				</Badge>
			  </button>,
				<button  key={'btnuser'} onClick={
					()=>{
					this.onClickUser()
					}}>
					<span>{Depatname}-</span>
					<span>{PermissionName}-</span>
					<span>{truename}</span>
				</button>
			];
			const title = this.props.title || '病人列表';
	    return (
	      	<Header>
           			<span><img src="index.png" className="icon-index"  alt=""/>{title}</span>
								{this.props.showbtns && btns}
	      	</Header>
	    );
  	}
}

const mapStateToProps = ({userlogin}) => {
    return {userlogin};
}
App = withRouter(App);
export default connect(mapStateToProps)(App);
