import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import {set_uiapp} from '../../actions';
import { Avatar,Badge } from 'antd';

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
				}}>
				<Badge count={99} overflowCount={10}>
					<span style={{color:'white'}}>申报审阅&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				</Badge>
			  </button>,
				<button  key={'btnuser'} onClick={
					()=>{
					this.onClickUser()
					}}>
					<Avatar style={{ backgroundColor:'#f56a00', verticalAlign: 'middle' }} shape="circle" size="large" >
					 张三
					</Avatar>
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

App = withRouter(App);
export default connect()(App);
