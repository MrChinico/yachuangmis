import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Patientinfolist from '../index/index_patientinfolist';
// import { Input } from 'antd'
// import lodashget from 'lodash.get';
import IndexHead from '../index/index_title';

class App extends React.Component {

		constructor(props) {
			super(props);
			this.state = {
				query:{},
			}
		}
		componentDidMount(){

		}

		componentWillUnmount() {

		}


  	render() {
			const title = "数据统计";
	    return (
	      	<Layout>
						<IndexHead title={title}/>
						<div className="content-box">
							<div className="content assess">
								<h2 className="none-border">
									<button className="return" onClick={
										()=>{
											this.props.history.replace('/');
										}
									}><img src="return.png"  alt=""/></button>
									<div className="clearfix"></div>
								</h2>
							</div>
							<Patientinfolist query={this.state.query}
									history={this.props.history}
									ref='plistsearch'/>
						</div>
	      	</Layout>
	    );
  	}
}


export default connect()(App);
