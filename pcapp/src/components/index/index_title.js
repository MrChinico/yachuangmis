import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import {set_uiapp} from '../../actions';

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
				}}>申报审阅</button>,
				<button key={'btnuserinfo'} onClick={
					()=>{
					this.onClickUser()
				}} className="">用户信息</button>
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

App = withRouter(App);
export default connect()(App);
