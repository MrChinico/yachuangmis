import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import lodashget from 'lodash.get';


class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickNew = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/newbarden/${curpaientinfo._id}/0`);
		}
  	render() {
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
	    return (
	      	<div>
						<div>
							<span>Barden评估记录</span>
							<Button onClick={
								()=>{
									this.onClickNew();
								}
							}>新建评估</Button>
							<Button>打印</Button>
						</div>
						<div>
							这里是表格
						</div>
						<div>
								这里是分页
						</div>
						<div>
						</div>
	      	</div>
	    );
  	}
}

App = withRouter(App);
export default connect()(App);
