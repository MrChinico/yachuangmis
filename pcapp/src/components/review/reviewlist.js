import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import IndexHead from '../index/index_title';
import ReviewDetaillist from './review_detaillist';

// import lodashget from 'lodash.get';
import './reviewlist.css';


class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickReviewDetail = (rid)=>{
			this.props.history.push(`/reviewdetail/${rid}`)
		}
  	render() {
	    return (
	      	<Layout>
						<IndexHead title="申报审阅"/>
						<div className="content-box">
								<div className="content">
									<h4>21206<span>张三丰</span>
										<button className="return" onClick={
											()=>{
												this.props.history.replace('/');
											}
										}><img src="return.png" alt=""/></button>
										<div className="clearfix"></div>
									</h4>
								</div>
								<ReviewDetaillist query={{}}
									history={this.props.history}
									ref='rlistsearch'/>
						</div>
	      	</Layout>
	    );
  	}
}

// const mapStateToProps = ({paientinfo},props) => {
// 		const {paientinfos} = paientinfo;
// 		const id = lodashget(props,'match.params.pid');
// 		let curpaientinfo = paientinfos[id];
//     return {curpaientinfo};
// }
// App = withRouter(App);
export default connect()(App);
