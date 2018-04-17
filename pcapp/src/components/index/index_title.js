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
            <span>头部。。。。</span>
						<Button onClick={
							()=>{
							this.onClickSearch()
						}}>搜索</Button>
						<Button onClick={
							()=>{
								this.onClickDatastat();
							}
						}>数据统计</Button>
						<Button onClick={
							()=>{
							this.onClickReview()
						}}>申报审阅</Button>
						<Button onClick={
							()=>{
							this.onClickUser()
						}}>用户信息</Button>
	      	</Header>
	    );
  	}
}

App = withRouter(App);
export default connect()(App);
