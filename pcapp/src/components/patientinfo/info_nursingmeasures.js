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
			this.props.history.push(`/newnursingmeasures/${curpaientinfo._id}/0`);
		}
  	render() {
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
	    return (
	      	<div>
						<div>
							<span>护理措施记录</span>
							<Button onClick={
								()=>{
									this.onClickNew();
								}
							}>新建护理措施</Button>
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
