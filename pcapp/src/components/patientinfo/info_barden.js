import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { Button } from 'antd';
import { Pagination } from 'antd';
// import lodashget from 'lodash.get';
import ContentTitleBar from './patientinfo_content_titlebar';

class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickNew = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/newbarden/${curpaientinfo._id}/0`);
		}
		onClickViewPrint = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/viewprintrecordbarden/${curpaientinfo._id}`);
		}
  	render() {
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
	    return (
	      	<div>
						<ContentTitleBar title="Barden评估记录" titleNew="新建评估" titleView="查看&打印"
							onClickNew={this.onClickNew} onClickViewPrint={this.onClickViewPrint} />
						<div className="record-box">
							<ul>
								<li>
									<span>2018/03/12 12:30</span>
									<span>Barden评分：16分</span>
									<span>评分护士：王小五</span>
									<span>详细信息</span>
								</li>
								<li>
									<span>2018/03/12 12:30</span>
									<span>Barden评分：16分</span>
									<span>评分护士：王小五</span>
									<span>详细信息</span>
								</li>
								<li>
									<span>2018/03/12 12:30</span>
									<span>Barden评分：16分</span>
									<span>评分护士：王小五</span>
									<span>详细信息</span>
								</li>
							</ul>
						</div>

						<Pagination defaultCurrent={1} total={50} />

	      	</div>
	    );
  	}
}

App = withRouter(App);
export default connect()(App);
