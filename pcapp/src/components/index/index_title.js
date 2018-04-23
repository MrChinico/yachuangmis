import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout,Button } from 'antd';
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

		}

  	render() {
	    return (
	      	<Header>
            <span>病人列表</span>
					<button onClick={
						()=>{
						this.onClickSearch()
					}}>搜索</button>
					<button onClick={
						()=>{
							this.onClickDatastat();
						}
					}>数据统计</button>
					<button onClick={
						()=>{
						this.onClickReview()
					}}>申报审阅</button>
					<button onClick={
						()=>{
						this.onClickUser()
					}} className="">用户信息</button>
	      	</Header>
	    );
  	}
}

App = withRouter(App);
export default connect()(App);
