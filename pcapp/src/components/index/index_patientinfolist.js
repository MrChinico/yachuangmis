import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import lodashmap from 'lodash.map';
import { Layout } from 'antd';
import { Pagination } from 'antd';
import './index.css';
import Paientinfo from './index_patientinfo';
const { Content } = Layout;


class App extends React.Component {

		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onClickDetail = (pid)=>{
			this.props.history.push(`/indexdetail/${pid}`);
		}
		onClickEvalute = (pid)=>{
			this.props.history.push(`/indexinfo/${pid}`);
		}
  	render() {
			const {paientinfolist,paientinfos} = this.props;
	    return (
	      	<Content>
          	{
							lodashmap(paientinfolist,(pid)=>{
								return (<Paientinfo key={pid}
									curpaientinfo={paientinfos[pid]}
									onClickDetail={()=>{this.onClickDetail(pid)}}
									onClickEvalute={()=>{this.onClickEvalute(pid)}}/>);
							})
						}
						<div className="clearfix"></div>
						<Pagination defaultCurrent={1} total={50} />

	      	</Content>
	    );
  	}
}


const mapStateToProps = ({paientinfo}) => {
		const {paientinfolist,paientinfos} = paientinfo;
    return {paientinfolist,paientinfos};
}
App = withRouter(App);
export default connect(mapStateToProps)(App);
