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
			const showtext = '压疮发生率 28% 2391人';
	    return (
	      	<Layout>
						<IndexHead title={title}/>
						<div className="index-box">
							<div className="index-content assess">
								<h2 className="bbm-green">
									{showtext}
									<button className="return" onClick={
									()=>{
										this.props.history.goBack();
									}
								}><img src="return.png" alt="" /></button>
									<div className="clearfix">
								</div>
								</h2>
								<Patientinfolist query={this.state.query}
									history={this.props.history}
									ref='plistsearch'/>
							</div>
						</div>
	      	</Layout>
	    );
  	}
}


export default connect()(App);
